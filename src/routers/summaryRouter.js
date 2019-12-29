import express from "express";
import routes from "../routes";
import { addSummary } from "../controllers/summaryController";

const summaryRouter = express.Router();

//Post add
summaryRouter.post(routes.summary_add(), addSummary);

//Post get
//summaryRouter.get(routes.sumamry_list, postLogin);
export default summaryRouter;
