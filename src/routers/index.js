import { Router } from "express";
import authRouter from "./authRouters.js";
import logoutSessionRouter from "./logoutSessionRouters.js";
import registersRouter from "./registersRouters.js";

const routers = Router();
routers.use(authRouter);
routers.use(registersRouter);
routers.use(logoutSessionRouter);

export default routers;
