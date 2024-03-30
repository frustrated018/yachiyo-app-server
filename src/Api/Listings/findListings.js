const Listing = require("../../Models/Listing");

const findListings = async (req, res) => {
  let { page, limit } = req.query;

  //TODO: Add a filter to sort the data by category or in this case Room type

  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  try {
    const result = await Listing.aggregate([
      {
        $facet: {
          metaData: [
            {
              $count: "totalDocuments",
            },
            {
              $addFields: {
                pageNumber: page,
                totalPages: { $ceil: { $divide: ["$totalDocuments", limit] } },
              },
            },
          ],
          data: [
            {
              $project: {
                name: 1,
                medium_url: 1,
                review_scores_rating: 1,
                room_type: 1,
                price: 1,
              },
            },
            {
              $skip: (page - 1) * limit,
            },
            {
              $limit: limit,
            },
          ],
        },
      },
    ]);

    // if else condition to handle the result array being empty
    if (result.length > 0) {
      const listings = result[0];
      listings.metaData = {
        ...listings.metaData[0],
        documentsPerPage: listings.data.length,
      };
      res.send(listings);
    } else {
      res.status(404).send({ message: "No listings found" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = findListings;

//.find()
// .select("name medium_url review_scores_rating room_type price")
// .skip((page - 1) * limit)
// .limit(limit);
