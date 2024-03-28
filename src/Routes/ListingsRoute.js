const findListings = require("../Api/Listings/findListings");
const router = require("express").Router();



// Find Listings
router.get('/', findListings)

module.exports = router;
