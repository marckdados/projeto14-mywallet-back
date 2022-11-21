import db from "../database/db.js";
import signInSchema from "../schemas/signInSchemas.js";
import bcrypt from "bcrypt";

export async function signInValidate(req, res, next) {
  const user = req.body;
  const { email, password } = user;

  const { error } = signInSchema.validate(user, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(401).send(errors);
  }

  try {
    const userExisters = await db.collection("users").findOne({ email });
    if (!userExisters) {
      return res.sendStatus(401);
    }
    if (!bcrypt.compareSync(password, userExisters.password)) {
      return res.sendStatus(401);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
  next();
}
