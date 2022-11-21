import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";
import { signInValidate } from "../middlewares/signInValidate.middleware.js";
import { signUpValidate } from "../middlewares/signUpValidate.middleware.js";

const authRouter = Router();
authRouter.post("/sign-up", signUpValidate, signUp);
authRouter.post("/sign-in", signInValidate, signIn);

export default authRouter;
