import { userSchema } from "../models/users.model.js";

export async function signUpValidate(req, res, next) {
  const user = req.body;

  if (!user.name || !user.email || !user.password) {
    return res.sendStatus(401);
  }

  const { error } = userSchema.validate(user, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(401).send(errors);
  }
  next();
}
