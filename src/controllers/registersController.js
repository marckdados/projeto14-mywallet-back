import db from "../database/db.js";
import dayjs from "dayjs";

export async function registersPost(req, res) {
  const registersBody = req.body;
  const { authorization } = req.headers;
  const usersCollection = db.collection("users");
  const token = authorization?.replace("Bearer ", "");
  try {
    const session = await db.collection("sessions").findOne({ token });
    const user = await usersCollection.findOne({ _id: session.userId });
    await usersCollection.updateOne(
      { _id: user._id },
      {
        $push: {
          registers: { ...registersBody, date: dayjs().format("DD/MM") },
        },
      }
    );
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
}

export async function registersGet(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  const usersCollection = db.collection("users");

  try {
    const session = await db.collection("sessions").findOne({ token });
    const user = await usersCollection.findOne({ _id: session.userId });
    delete user.password;
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
