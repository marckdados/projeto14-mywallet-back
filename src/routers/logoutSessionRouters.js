import { Router } from "express";
import { logoutSession } from "../controllers/logoutSessionController.js";

const logoutSessionRouter = Router();

logoutSessionRouter.delete("/delete", logoutSession);

export default logoutSessionRouter;
