import express from "express";
import cors from "cors";
import "./db/server.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import userRouter from "./routes/userRouter.js";
import authRouter from "./routes/authRouter.js";
import postRouter from "./routes/postRouter.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

/* app.use("/", (req, res) => {
  res.send("Hello Marta, Piotr, Soydan, Phil!");
}); */

/* 
ALL ROUTES

Home Route ("/")
"/*" , 404

Authentication Route ("/auth")
"/signup", post, createNewOne
"/signin", post

User Route ("/user")
"/:id", get, delete
"/:id/cart", get, delete, post
"/:id/wishlist", get, delete, post
*/

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/posts", postRouter);

app.use(errorHandler);

app.listen(PORT, (req, res) => {
  console.log(`Example app listening on http://localhost:${PORT}`);
});
