import express from "express";
import passport from "passport";
import routes from "../routes";
import {
  postJoin,
  postLogin,
  logout,
  LoginTimeUpdate,
  googleLogin,
  postGoogleLogin,
  postFacebookLogin,
  facebookLogin
} from "../controllers/userController";
import { onlyPublic, onlyPrivate } from "../middlewares";

const globalRouter = express.Router();

//Post Join
globalRouter.post(routes.join, onlyPublic, postJoin);

//Post Login
globalRouter.post(routes.login, onlyPublic, postLogin);

//Get Log Out
globalRouter.get(routes.logout, onlyPrivate, logout);

//Post LoginTime
globalRouter.post(routes.loginTime, onlyPrivate, LoginTimeUpdate);

//Google Login
globalRouter.get(routes.google, onlyPublic, googleLogin);

globalRouter.get(
  routes.googleCallback,
  passport.authenticate("google", { failureRedirect: "/login" }),
  postGoogleLogin
);

//Facebook Login
globalRouter.get(routes.facebook, facebookLogin);

globalRouter.get(
  routes.facebookCallback,
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  postFacebookLogin
);

export default globalRouter;
