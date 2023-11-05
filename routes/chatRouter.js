import express from "express";
import * as chatController from "../controllers/chatController.js";

const chatRouter = express.Router();

chatRouter.post("/", chatController.chatCompletion);

export default chatRouter;
