import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use("/", (req, res) => {
  res.send("Hello Marta, Piotr, Soydan, Phil!");
});

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

app.listen(PORT, (req, res) => {
  console.log(`Example app listening on http://localhost:${PORT}`);
});
