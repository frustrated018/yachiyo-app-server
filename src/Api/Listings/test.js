const Listing = require("../../Models/Listing");

const testingShit = async (req, res) => {
  try {
    const result = await Listing.find().select("name");

    res.send(`Total documents ${result.length}`);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = testingShit;
