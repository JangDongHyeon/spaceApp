import express from "express";
import routes from "../routes";
import {
  postFindPassword,
  postChangePassword,
  search
} from "../controllers/userController";

const userRouter = express.Router();

//Post FindPassword
userRouter.post(routes.passwordFind, postFindPassword);

//Post ChangPassword
userRouter.post(routes.changePassword, postChangePassword);

//Search
userRouter.get(routes.search, search);
export default userRouter;
