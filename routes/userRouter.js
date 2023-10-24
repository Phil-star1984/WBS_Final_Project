import express from "express";
import * as userController from "../controllers/userController.js";

const userRouter = express.Router();

userRouter
  .route("/:id")
  .get(userController.getUserById)
  .delete(userController.deleteUser);

userRouter
  .route("/:userId/cart")
  .get(userController.getCart)
  .post(userController.addGameToCart)
  .delete(userController.deleteGameInCart);

userRouter
  .route("/:userId/wishlist")
  .get(userController.getWishlist)
  .post(userController.addGameToWishlist)
  .delete(userController.deleteGameInWishlist);

export default userRouter;
