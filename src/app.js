const express = require("express");
const cors = require("cors");
require("dotenv").config;

const app = express();


//! Middlewares [Don't know the correct port for expo app]
app.use(express.json())
app.use(cors({origin:["http://localhost:5173"]}))

//* Checking if server is running

app.get("/health", (req, res) => {
  res.send("server is running");
});

module.exports = app;
