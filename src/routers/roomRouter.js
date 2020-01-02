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

const roomRouter = express.Router();

//채팅방 생성
roomRouter.post(routes.room_add(), addRoom);

//채팅봇 레벨 모드 변경
roomRouter.post(routes.room_bot_level(), botRoomLevel);

//채팅봇 모드 번경
roomRouter.post(routes.room_bot_mode(), RoomModeChange);

//채팅봇 언어 변경
roomRouter.post(routes.room_bot_language(), RoomLanguageChange);

//채팅방 초대
roomRouter.post(routes.room_invite(), inviteRoom);

//채팅방 강퇴
roomRouter.post(routes.room_exile(), exileRoom);

//채팅방 나가기
roomRouter.post(routes.room_exit(), exitRoom);

export default roomRouter;
