require("dotenv").config();

const MongoClient = require("mongodb").MongoClient;
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db: any;

const connectToDb = async () => {
  try {
    await client.connect();
    db = client.db("poetry");
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
};

const getDb = () => db;

export { connectToDb, getDb };
