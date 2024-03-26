const Listing = require("../../Models/Listing");

const findAllListings = async (req, res) => {
  const result = await Listing.find();
  res.send(result);
};

module.exports = findAllListings;
