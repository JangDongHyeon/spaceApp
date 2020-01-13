import "@babel/polyfill";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import hpp from "hpp";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
//import logger from "./logger";
import flash from "express-flash";
import { localsMiddleware } from "./middlewares";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import friendRouter from "./routers/friendRouter";
import summaryRouter from "./routers/summaryRouter";
import roomRouter from "./routers/roomRouter";
import chatRouter from "./routers/chatRouter";
import routes from "./routes";

import "./passport";

const app = express();
dotenv.config();

const CookieStore = MongoStore(session);
const sessionOption = {
  secret: process.env.COOKIE_SECRET,
  resave: true,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false
  },
  // npm install connect-mongo, 쿠키 정보를 mongoDB에 저장
  store: new CookieStore({ mongooseConnection: mongoose.connection })
};
app.use(cors());
app.use(helmet());
app.use(hpp());
app.disable("x-powered-by");
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "pro") {
  app.use(morgan("combined"), { stream: logger.stream });
  sessionOption.proxy = true;
  sessionOption.cookie.secure = true;
} else {
  app.use(morgan("dev"));
}
app.use(session(sessionOption));
// app.use(csrf({ cookie: true }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware);
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.friend, friendRouter);
app.use(routes.summary, summaryRouter);
app.use(routes.room, roomRouter);
app.use(routes.chat, chatRouter);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;

  console.log(err.message);
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send("error 발생 다시 시도 해주세요");
});

export default app;
