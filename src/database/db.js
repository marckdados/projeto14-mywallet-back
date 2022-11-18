import { MongoClient } from "mongodb";

const mongoClient = new MongoClient(process.env.MONGO_URI);
await mongoClient.connect();
let db;
db = mongoClient.db("my_wallet");

export default db;
