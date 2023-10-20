import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use("/", (req, res) => {
  res.send("Hello Marta, Piotr, Soydan, Phil!");
});

app.listen(PORT, (req, res) => {
  console.log(`Example app listening on http://localhost:${PORT}`);
});
