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
  facebookLogin,
  emailFind
} from "../controllers/userController";
import { onlyPublic, onlyPrivate } from "../middlewares";

const globalRouter = express.Router();

//Post Join
globalRouter.post(routes.join, onlyPublic, postJoin);

//Post Login
globalRouter.post(routes.login, onlyPublic, (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({ result: "error" }).status(400);
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      console.log(req.cookies);

      return res.json({
        result: "ok",
        id: req.user.id,
        name: req.user.name,
        lastLogin: req.user.updatedAt,
        cookie: req.cookies
      });
    });
  })(req, res, next);
});

//Get Log Out
globalRouter.get(routes.logout, onlyPrivate, logout);

//Post LoginTime
globalRouter.post(routes.loginTime, onlyPrivate, LoginTimeUpdate);

//Email  Find
globalRouter.get(routes.email_find, onlyPublic, emailFind);

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
