import express from "express";
import routes from "../routes";
import {
  chatAdd,
  chatList,
  chatContentGet
} from "../controllers/chatController";

const chatRouter = express.Router();

//대화 생성
chatRouter.post(routes.chat_add(), chatAdd);

//채팅방  리스트

chatRouter.get(routes.chat_list(), chatList);

//채팅 로고
chatRouter.get(routes.chat_content(), chatContentGet);

export default chatRouter;
