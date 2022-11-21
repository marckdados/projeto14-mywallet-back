import db from "../database/db.js";

export async function logoutSession(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const session = await db.collection("sessions").findOne({ token });
    const response = db.collection("sessions").deleteOne({ session });
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
