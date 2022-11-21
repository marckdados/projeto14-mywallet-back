import db from "../database/db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signIn(req, res) {
  const { email } = req.body;
  const userExisters = await db.collection("users").findOne({ email });
  try {
    const token = uuid();
    await db
      .collection("sessions")
      .insertOne({ userId: userExisters._id, token });
    delete userExisters.password;
    res.status(200).send({ userExisters, token });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function signUp(req, res) {
  const user = req.body;
  const hashPassword = bcrypt.hashSync(user.password, 10);

  try {
    await db.collection("users").insertOne({
      ...user,
      password: hashPassword,
      balance: 0,
      registers: [],
    });
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
