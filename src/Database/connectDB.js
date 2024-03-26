const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  console.log("connecting to DB");
  const uri = process.env.CONNECTION_URI;
  await mongoose.connect(uri, { dbName: process.env.DB_NAME });
  console.log("Connected to DB");
};

module.exports = connectDB;
