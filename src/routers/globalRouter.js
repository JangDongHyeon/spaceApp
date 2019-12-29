import express from "express";
import passport from "passport";
import routes from "../routes";
import {
  postJoin,
  postLogin,
  logout,
  LoginTimeUpdate
} from "../controllers/userController";

const globalRouter = express.Router();

//Post Join
globalRouter.post(routes.join, postJoin);

//Post Login
globalRouter.post(routes.login, postLogin);

//Get Log Out
globalRouter.get(routes.logout, logout);

//Post LoginTime
globalRouter.post(routes.loginTime, LoginTimeUpdate);

export default globalRouter;
