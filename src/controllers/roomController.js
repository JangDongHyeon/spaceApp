import routes from "../routes";
import User from "../models/User";
import Room from "../models/Room";
import Chat from "../models/Chat";
import chatApi from "../apis/chat";
import request from "request-promise-native";

//방 만들기
export const addRoom = async (req, res) => {
  const {
    params: { id },
    body: { friend_id, language }
  } = req;

  try {
    const user = await User.findById(id);
    const newRoom = await Room.create({
      owner: id,
      language: language
    });

    friend_id.push(id);
    friend_id.forEach(element => {
      newRoom.users.push(element);
    });
    newRoom.save();
    user.rooms.push(newRoom);
    user.save();
    await chatApi.get("/chat/create", {
      params: {
        roomId: newRoom.id
      }
    });
    res.status(200).json({ result: "ok", room_index: newRoom.id });
  } catch (error) {
    console.log(error);
    res.status(400).json({ result: "error" });
  } finally {
    res.end();
  }
};

//방 초대
export const inviteRoom = async (req, res) => {
  const {
    params: { id },
    body: { room_uid, friend_id }
  } = req;
  try {
    const room = await Room.findById(room_uid);
    if (room.owner === req.user.id) {
      room.users.push(friend_id);
      room.save();
      res.status(200).json({ result: "ok" });
    } else res.status(400).json({ result: "error" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ result: "error" });
  } finally {
    res.end();
  }
};

//사용자 추방
export const exileRoom = async (req, res) => {
  const {
    params: { id },
    body: { room_uid, kick_id }
  } = req;
  try {
    const room = await Room.findById(room_uid);
    if (room.owner === req.user.id) {
      room.users.pull(kick_id);
      room.save();
      res.status(200).json({ result: "ok" });
    } else res.status(400).json({ result: "error" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ result: "error" });
  } finally {
    res.end();
  }
};

//채팅방 bot_Level 설정
export const botRoomLevel = async (req, res) => {
  const {
    params: { id },
    body: { room_uid, bot_level }
  } = req;
  try {
    if (!bot_level) bot_level = "max";
    const rooms = await Room.findById(room_uid);
    if (rooms.owner === req.user.id) {
      await Room.findOneAndUpdate({ _id: room_uid }, { botLevel: bot_level });
      res.status(200).json({ result: "ok" });
    } else res.status(400).json({ result: "error" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ result: "error" });
  } finally {
    res.end();
  }
};

//채팅방 bot_Mode 설정
export const RoomModeChange = async (req, res) => {
  const {
    params: { id },
    body: { room_uid, bot_mode }
  } = req;
  try {
    if (!bot_mode) bot_mode = "intent";
    const rooms = await Room.findById(room_uid);
    if (rooms.owner === req.user.id) {
      await Room.findOneAndUpdate({ _id: room_uid }, { botMode: bot_mode });
      res.status(200).json({ result: "ok" });
    } else res.status(400).json({ result: "error" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ result: "error" });
  } finally {
    res.end();
  }
};

//채팅방 bot_language 설정
export const RoomLanguageChange = async (req, res) => {
  const {
    params: { id },
    body: { room_uid, language }
  } = req;
  try {
    if (!language) language = "english";
    const rooms = await Room.findById(room_uid);
    if (rooms.owner === req.user.id) {
      await Room.findOneAndUpdate({ _id: room_uid }, { language: language });
      res.status(200).json({ result: "ok" });
    } else res.status(400).json({ result: "error" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ result: "error" });
  } finally {
    res.end();
  }
};

//채팅방 나가기
export const exitRoom = async (req, res) => {
  const {
    params: { id },
    body: { room_uid }
  } = req;
  try {
    const rooms = await Room.findById(room_uid);

    //방장이  아니라면
    if (rooms.owner !== req.user.id) {
      rooms.users.pull(id);
      rooms.save();
    } else {
      if (rooms.users.length > 1) {
        await rooms.users.pull(id);
        await rooms.update({ owner: rooms.users[0] });
        // await Room.Update({ _id: id }, { owner: rooms.users[0] });
        rooms.save();
        res.status(200).json({ result: "ok" });
      } else {
        await Room.findOneAndRemove({ _id: room_uid });
        await chatApi.get("/chat/delete", {
          params: {
            roomId: rooms.id
          }
        });

        res.status(200).json({ result: "ok" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ result: "error" });
  } finally {
    res.end();
  }
};
