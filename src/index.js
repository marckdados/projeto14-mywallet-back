import express from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

//configs
dotenv.config();
const app = express();
app.use(express.json());

app.app.listen(5000, () => {
  console.log("Conectado na porta 5000");
});
