import express from "express";
import routes from "../routes";
import { addSummary, listSummary } from "../controllers/summaryController";
import { onlyPrivate } from "../middlewares";

const summaryRouter = express.Router();

//Post add
summaryRouter.post(routes.summary_add(), onlyPrivate, addSummary);

//요약리스트
summaryRouter.get(routes.sumamry_list(), onlyPrivate, listSummary);

//Post get
//summaryRouter.get(routes.sumamry_list, postLogin);
export default summaryRouter;
