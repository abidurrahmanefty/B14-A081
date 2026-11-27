
const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://abidurmd57_db_user:Abid123%40%23@cluster0.ob6t4oy.mongodb.net/";

const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log("MongoDB Connected Successfully!");

  } catch (error) {
    console.log("Connection Failed:", error);
  }
}

connectDB();
