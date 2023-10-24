import express from "express";
import * as postController from "../controllers/postController.js";
import verifyToken from "../middlewares/verifyToken.js";

const postRouter = express.Router();

postRouter
  .route("/")
  .get(postController.getAllPosts)
  .post(verifyToken, postController.createPost);

postRouter
  .route("/:id")
  .get(verifyToken, postController.getSinglePost)
  .put(verifyToken, postController.updatePost)
  .delete(verifyToken, postController.deletePost);

export default postRouter;
