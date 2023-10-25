import express from "express";
import * as authController from "../controllers/authController.js";
import verifyToken from "../middlewares/verifyToken.js";

const authRouter = express.Router();

authRouter.post("/signup", authController.signUp);
authRouter.post("/signin", authController.signIn);
authRouter.post("/logout", verifyToken, authController.logout);
authRouter.get("/me", verifyToken, authController.getUser);

export default authRouter;
