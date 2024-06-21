const elasticClient = require("../services/elasticSearchClient");
const { diamondArgsSchema } = require("../validation/validationSchemas");

const resolvers = {
  Query: {
    diamonds: async (_, args) => {
      // Validate the arguments
      const { error, value } = diamondArgsSchema.validate(args);
      if (error) {
        throw new Error(`Invalid arguments: ${error.details.map((x) => x.message).join(", ")}`);
      }

      // Can add diamonds to REDIS cache for querys that has been searched for more then 10 times per min // or for diamonds that we know there is high demand
      const must = [];
      if (args.price !== undefined) must.push({ match: { price: args.price } });
      if (args.shape !== undefined) must.push({ match: { shape: args.shape } });
      if (args.color !== undefined) must.push({ match: { color: args.color } });
      if (args.clarity !== undefined) must.push({ match: { clarity: args.clarity } });
      if (args.carat !== undefined) must.push({ match: { carat: args.carat } });
      if (args.cut !== undefined) must.push({ match: { cut: args.cut } });
      if (args.isLabDiamond !== undefined) must.push({ match: { isLabDiamond: args.isLabDiamond } });

      // Logging query
      console.log("Elasticsearch query:", JSON.stringify(must, null, 2));

      try {
        const response = await elasticClient.search({
          index: "diamonds",
          body: {
            query: {
              bool: {
                must: must,
              },
            },
            // Can add pagination for elastic for huge amounts of data sets like this:
            // from: args.offset || 0,
            // size: args.limit || 10,
          },
        });

        const searchDiamondsResult = response.hits.hits.map((hit) => ({
          id: hit._id,
          price: hit._source.price,
          shape: hit._source.shape,
          color: hit._source.color,
          clarity: hit._source.clarity,
          carat: hit._source.carat,
          cut: hit._source.cut,
          isLabDiamond: hit._source.isLabDiamond,
        }));

        console.log("Elasticsearch response:", JSON.stringify(searchDiamondsResult, null, 2));
        return searchDiamondsResult;
      } catch (error) {
        console.error("Error fetching diamonds:", error);
        throw new Error("Error fetching diamonds");
      }
    },
  },
};

module.exports = resolvers;
