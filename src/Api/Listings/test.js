const Listing = require("../../Models/Listing");

const testingShit = async (req, res) => {
  const { property_type } = req.query;

  try {
    const result = await Listing.aggregate([
      {
        $project: {
          property_type: 1,
        },
      },
      {
        $match: {
          property_type: property_type,
        },
      },
    ]);

    res.status(200).send(`Total number of ${property_type} ` + result.length);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = testingShit;
