import express from "express";
import routes from "../routes";
import {
  postAddFriend,
  deleteFriend,
  AddFirendAccept,
  requestFirendList,
  friendList
} from "../controllers/friendController";
import { onlyPrivate } from "../middlewares";

const friendRouter = express.Router();

//친구  추가
friendRouter.post(routes.friendAdd(), onlyPrivate, postAddFriend);

//친구  삭제
friendRouter.post(routes.friendDelete(), onlyPrivate, deleteFriend);

// 친구  승인
friendRouter.post(routes.friendAccept(), onlyPrivate, AddFirendAccept);

// 친구 요청  리스트
friendRouter.get(routes.friendRequestList(), onlyPrivate, requestFirendList);

//친구  리스트
friendRouter.get(routes.friendList(), onlyPrivate, friendList);

export default friendRouter;
