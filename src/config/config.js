const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      dbName: dbName,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
