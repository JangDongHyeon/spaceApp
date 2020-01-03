import routes from "../routes";
import User from "../models/User";
import Room from "../models/Room";
import Chat from "../models/Chat";
import chatApi from "../apis/chat";

//채팅 리스트
export const chatList = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    let usersRooms = [];
    usersRooms = await User.findById(id).populate({
      path: "rooms"
    });

    const result = await Promise.all(
      usersRooms.rooms.map(async room => {
        let chat = await Chat.findOne({ roomId: room._id }).sort({ _id: -1 });

        return { room_index: room._id, content: chat.content };
      })
    );
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }
};

//대화등록

export const chatAdd = async (req, res) => {
  const {
    params: { id },
    body: { room_index, content }
  } = req;

  try {
    const newChat = await Chat.create({
      userId: id,
      content: content,
      roomId: room_index
    });

    const room = await Room.findById(room_index);
    room.chats.push(newChat);
    room.save();

    // //감정
    // const sentiment= await chatApi.get("/chat/sentiment", {
    //     params: {
    //       sentence: content,
    //       roomId: room_index
    //     }
    //   });
    //챗봇
    // const chatBot= await chatApi.get("/chat/english",{
    //     params: {
    //         sentence: content,
    //         roomIdz: room_index,
    //         method:room.botLevel,
    //         mode:req.body.chatMo
    //       }
    //   })
    res.json({ chat_index: newChat._id, regdate: newChat.createdAt });
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

//대화 내용 받기
export const chatContentGet = async (req, res) => {
  const {
    params: { id, room_index },
    query: { start_index, end_index }
  } = req;
  try {
    const start_index1 = Number(start_index);
    const end_index1 = Number(end_index);

    const chatList = await Chat.find({ roomId: room_index })
      .sort({ _id: -1 })
      .skip((start_index1 - 1) * end_index1)
      .limit(end_index1);

    res.json(chatList).status(200);
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }
};

//대화 요약
export const chatSummary = async (req, res) => {
  const {
    params: { id, room_index },
    body: { start_index, end_index }
  } = req;

  try {
    const chatList = await Chat.find({
      roomId: room_index,
      id: { $gte: start_index, $lte: end_index }
    }).sort({ _id: 1 });
    let chat = "";
    chatList.forEach(chats => {
      chat += chats.content + ". ";
    });

    const options = {
      uri: "https://chat.neoali.com:8074/summary_short",
      method: "POST",
      form: { String: chat }
    };
    let summary;
    await request(options)
      .then(body => {
        summary = body;
      })
      .catch(err => console.log(err));

    const newSummary = await Summary.create({
      summary: summary,
      summaryId: room_index
    });

    res.json({ summary_index: newSummary._id, summary: summary }).status(200);
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }
};
