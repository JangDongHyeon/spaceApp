import express from "express";
import routes from "../routes";
import {
  chatAdd,
  chatList,
  chatContentGet,
  chatSummary
} from "../controllers/chatController";
import { onlyPrivate } from "../middlewares";

const chatRouter = express.Router();

//대화 생성
chatRouter.post(routes.chat_add(), onlyPrivate, chatAdd);

//채팅방  리스트

chatRouter.get(routes.chat_list(), onlyPrivate, chatList);

//채팅 로고
chatRouter.get(routes.chat_content(), onlyPrivate, chatContentGet);

//채팅 요약
chatRouter.post(routes.chat_summary(), onlyPrivate, chatSummary);

export default chatRouter;
