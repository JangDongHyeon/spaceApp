import "@babel/polyfill";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import path from "path";
import flash from "express-flash";
import csrf from "csurf";
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
const CokieStore = MongoStore(session);

app.use(helmet());
app.disable("x-powered-by");
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    // npm install connect-mongo, 쿠키 정보를 mongoDB에 저장
    store: new CokieStore({ mongooseConnection: mongoose.connection })
  })
);
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

export default app;
