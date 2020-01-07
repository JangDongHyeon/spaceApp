import express from "express";
import routes from "../routes";
import {
  postFindPassword,
  postChangePassword,
  search
} from "../controllers/userController";
import { onlyPrivate } from "../middlewares";

const userRouter = express.Router();

//Post FindPassword
userRouter.post(routes.passwordFind, onlyPrivate, postFindPassword);

//Post ChangPassword
userRouter.post(routes.changePassword, onlyPrivate, postChangePassword);

//Search
userRouter.get(routes.search, search);
export default userRouter;
