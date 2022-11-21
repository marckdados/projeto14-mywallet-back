import { Router } from "express";
import {
  registersGet,
  registersPost,
} from "../controllers/registersController.js";
import { registersValidate } from "../middlewares/registersValidateMiddleware.js";

const registersRouter = Router();

registersRouter.use(registersValidate);
registersRouter.post("/registers", registersPost);
registersRouter.get("/registers", registersGet);

export default registersRouter;
