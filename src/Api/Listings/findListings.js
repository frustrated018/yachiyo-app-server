const Listing = require("../../Models/Listing");

const findListings = async (req, res) => {
  //TODO: Update metadeta to contain the total from the property match
  //! ISSUE : The vercel server crashes if the query is missing even though i set the default values

  let { page, limit, property_type } = req.query;

  // Default property type filter to "Apartment" if not provided
  // Converting the string to "String"
  property_type =
    property_type.charAt(0).toUpperCase() + property_type.slice(1) ||
    "Apartment";

  // Default values if not provided
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  try {
    // Filtering by Property Type
    let matchQuery;
    if (property_type.toLowerCase() === "special") {
      matchQuery = {
        property_type: {
          $in: [
            "Serviced apartment",
            "Cabin",
            "Bungalow",
            "Other",
            "Townhouse",
          ],
        },
      };
    } else {
      matchQuery = {
        property_type: property_type,
      };
    }

    console.log(matchQuery);

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
              $match: matchQuery,
            },
            {
              $project: {
                name: 1,
                property_type: 1,
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
