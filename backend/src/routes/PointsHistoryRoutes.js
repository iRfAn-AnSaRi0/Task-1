import { Router } from "express";
import { UserPointHistory } from "../controller/PointsHistoryController.js";

const pointhistoryrouter = Router();

pointhistoryrouter.route("/:id").get(UserPointHistory)

export { pointhistoryrouter }