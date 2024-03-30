const Listing = require("../../Models/Listing");

const findListingById = async (req, res) => {
  const { id } = req.query;

  //TODO: run a select method to select only the necessary fields
  //TODO:Also see if you can find way to aggrigate this method

  try {
    const result = await Listing.findById(id);
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "Error Fetching Data", error });
  }
};

module.exports = findListingById;
