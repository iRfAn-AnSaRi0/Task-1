import { Router } from "express";
import { AddUser, getAllUsersWithRank } from "../controller/UserController.js";

const userrouter = Router();

userrouter.route("/")
    .post(AddUser)
    .get(getAllUsersWithRank);

export { userrouter }