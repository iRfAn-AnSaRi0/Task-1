import { Router } from "express";
import { ClaimPoint } from "../controller/PointsController.js";

const pointrouter = Router();

pointrouter.route("/:id").post(ClaimPoint)

export { pointrouter }