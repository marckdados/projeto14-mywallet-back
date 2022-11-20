import express from "express";
import authRouter from "./routers/auth.routers";

//configs

const app = express();
app.use(express.json());
app.use(authRouter);

app.listen(5000, () => {
  console.log("Conectado na porta 5000");
});
