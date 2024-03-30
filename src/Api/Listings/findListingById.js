const Listing = require("../../Models/Listing");

const findListingById = async (req, res) => {
  const { id } = req.query;

  try {
    const result = await Listing.findById(id);
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "Error Fetching Data", error });
  }
};

module.exports = findListingById;
