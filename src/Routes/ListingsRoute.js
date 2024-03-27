const findAllListings = require("../Api/Listings/findAllListings");
const findSpecificData = require("../Api/Listings/findSpecificData");

const router = require("express").Router();

//! Finding all assignments
router.get("/", findAllListings);

//! Finding specific shit
router.get("/specific", findSpecificData);

module.exports = router;
