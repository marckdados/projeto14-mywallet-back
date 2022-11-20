import db from "../database/db";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const user = await db.collection("users").findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = uuid();
      // await db.collection("sessions").insertOne({
      //   userId: user._id,
      //   token,
      // });
      res.status(200).send(token);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function signUp(req, res) {
  const user = req.body;
  //const hashPassword = bcrypt.hashSync(user.password, 10);

  try {
    // await db
    //   .userCollection("users")
    //   .insertOne({
    //     ...user,
    //     password: hashPassword,
    //     balance: 0,
    //     registers: [],
    //   });
    res.status(201).send(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
