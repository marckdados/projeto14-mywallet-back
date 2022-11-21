import db from "../database/db.js";
import signUpSchema from "../schemas/signUpSchemas.js";

export async function signUpValidate(req, res, next) {
  const user = req.body;

  if (!user.name || !user.email || !user.password) {
    return res.sendStatus(401);
  }

  const { error } = signUpSchema.validate(user, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(401).send(errors);
  }

  try {
    const userExisters = await db
      .collection("users")
      .findOne({ email: user.email });

    if (userExisters) {
      return res.status(409).send("Este email já existe !");
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
  next();
}
