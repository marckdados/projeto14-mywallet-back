import db from "../database/db.js";
import registersSchema from "../schemas/registersSchema.js";

export async function registersValidate(req, res, next) {
  const { authorization } = req.headers;
  const registers = req.body;
  const usersCollection = db.collection("users");

  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    return res.sendStatus(401);
  }

  const { error } = registersSchema.validate(registers, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(401).send(errors);
  }

  try {
    const session = await db.collection("sessions").findOne({ token });
    const user = await usersCollection.findOne({ _id: session?.userId });
    if (!user) {
      return res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
  next();
}
