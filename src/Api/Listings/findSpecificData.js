const Listing = require("../../Models/Listing");


//TODO: Get the select fields for the query or body of the request and give data based on that

const findSpecificData = async (req, res) => {
  try {
    const listings = await Listing.find().select("name summary");

    res.send(listings);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = findSpecificData;
