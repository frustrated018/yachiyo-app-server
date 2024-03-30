const findListingById = require("../Api/Listings/findListingById");
const findListings = require("../Api/Listings/findListings");
const testingShit = require("../Api/Listings/test");
const router = require("express").Router();

// Testing shit
router.get("/test", testingShit);

// Find Listings
router.get("/", findListings);

// Find Liting by Id
router.get("/findById", findListingById);

module.exports = router;
