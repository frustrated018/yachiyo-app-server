const express = require("express");
const cors = require("cors");
require("dotenv").config;

const app = express();

//! Middlewares [Don't know the correct port for expo app]
app.use(express.json());

//! ISSUE: find all route is timing out....
app.use(cors({ origin: ["http://localhost:5173", process.env.PROD_ORIGIN] }));

//* Actual DB Related Routes

const listingRoutes = require("./Routes/ListingsRoute");
app.use("/listings", listingRoutes);

//* Checking if server is running

app.get("/health", (req, res) => {
  res.send("server is running");
});

module.exports = app;
