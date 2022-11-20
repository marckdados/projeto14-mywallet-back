import { Router } from "express";
import { signUp } from "../controllers/auth.controller.js";
import { signUpValidate } from "../middlewares/signUpValidate.middleware.js";

const authRouter = Router();

authRouter.post("/sign-up", signUpValidate, signUp);
authRouter.post("/sign-in");

export default authRouter;
