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

const globalRouter = express.Router();

//Post Join
globalRouter.post(routes.join, postJoin);

//Post Login
globalRouter.post(routes.login, postLogin);

//Get Log Out
globalRouter.get(routes.logout, logout);

//Post LoginTime
globalRouter.post(routes.loginTime, LoginTimeUpdate);

//Google Login
globalRouter.get(routes.google, googleLogin);

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
