import express from "express";
import routes from "../routes";
import {
  postAddFriend,
  deleteFriend,
  AddFirendAccept,
  requestFirendList,
  friendList
} from "../controllers/friendController";

const friendRouter = express.Router();

friendRouter.post(routes.friendAdd(), postAddFriend);

friendRouter.post(routes.friendDelete(), deleteFriend);

friendRouter.post(routes.friendAccept(), AddFirendAccept);

friendRouter.get(routes.friendRequestList(), requestFirendList);

friendRouter.get(routes.friendList(), friendList);

export default friendRouter;
