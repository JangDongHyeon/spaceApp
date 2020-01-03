import express from "express";
import routes from "../routes";
import {
  chatAdd,
  chatList,
  chatContentGet,
  chatSummary
} from "../controllers/chatController";

const chatRouter = express.Router();

//대화 생성
chatRouter.post(routes.chat_add(), chatAdd);

//채팅방  리스트

chatRouter.get(routes.chat_list(), chatList);

//채팅 로고
chatRouter.get(routes.chat_content(), chatContentGet);

//채팅 요약
chatRouter.post(routes.chat_summary(), chatSummary);

export default chatRouter;
