import express from "express";
import routes from "../routes";
import {
  addRoom,
  botRoomLevel,
  inviteRoom,
  exitRoom,
  exileRoom,
  RoomModeChange,
  RoomLanguageChange
} from "../controllers/roomController";
import { onlyPrivate } from "../middlewares";

const roomRouter = express.Router();

//채팅방 생성
roomRouter.post(routes.room_add(), onlyPrivate, addRoom);

//채팅봇 레벨 모드 변경
roomRouter.post(routes.room_bot_level(), onlyPrivate, botRoomLevel);

//채팅봇 모드 번경
roomRouter.post(routes.room_bot_mode(), onlyPrivate, RoomModeChange);

//채팅봇 언어 변경
roomRouter.post(routes.room_bot_language(), onlyPrivate, RoomLanguageChange);

//채팅방 초대
roomRouter.post(routes.room_invite(), onlyPrivate, inviteRoom);

//채팅방 강퇴
roomRouter.post(routes.room_exile(), onlyPrivate, exileRoom);

//채팅방 나가기
roomRouter.post(routes.room_exit(), onlyPrivate, exitRoom);

export default roomRouter;
