const findAllListings = require("../Api/Listings/findAllListings");

const router = require("express").Router();

//! Finding all assignments
router.get("/", findAllListings);

module.exports = router;
