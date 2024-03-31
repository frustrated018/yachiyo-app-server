const Listing = require("../../Models/Listing");

const findListingById = async (req, res) => {
  const { id } = req.query;

  //TODO:Also see if you can find way to aggrigate this method

  try {
    const result = await Listing.findById(id).select(
      "xl_picture_url name room_type smart_location bedrooms beds bathrooms review_scores_rating number_of_reviews host_name host_picture_url host_since description price"
    );
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "Error Fetching Data", error });
  }
};

module.exports = findListingById;
