const client = require("./services/elasticSearchClient");
const fs = require("fs");
const path = require("path");

const createIndexIfNotExists = async () => {
  const indexName = "diamonds";

  try {
    // Check if the index exists
    const { body: indexExists } = await client.indices.exists({ index: indexName });

    if (!indexExists) {
      // Create the index
      await client.indices.create({
        index: indexName,
        body: {
          mappings: {
            properties: {
              price: { type: "float" },
              color: { type: "keyword" },
              clarity: { type: "keyword" },
              carat: { type: "float" },
              cut: { type: "keyword" },
              shape: { type: "keyword" },
              isLabDiamond: { type: "boolean" },
            },
          },
        },
      });
      console.log(`Index '${indexName}' created.`);
    } else {
      console.log(`Index '${indexName}' already exists.`);
    }
  } catch (error) {
    console.error("Error checking or creating index:", error);
    throw error;
  }
};

const bulkInsert = async () => {
  const bulkFilePath = path.join(__dirname, "bulk_diamonds.json");
  let bulkData;

  try {
    bulkData = fs.readFileSync(bulkFilePath, "utf8");
  } catch (error) {
    console.error("Error reading bulk data file:", error);
    return;
  }

  // Split and parse the bulk data
  const bulkBody = bulkData
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => {
      try {
        return JSON.parse(line);
      } catch (error) {
        console.error("Error parsing JSON line:", line, error);
        return null;
      }
    })
    .filter((item) => item !== null);

  console.log("Bulk body prepared:", bulkBody.length, "items");

  try {
    const response = await client.bulk({
      refresh: true,
      body: bulkBody,
    });

    console.log("Bulk insert response:", JSON.stringify(response, null, 2));
  } catch (error) {
    console.error("Error during bulk insert:", error.meta ? error.meta.body : error);
  }
};

const initialize = async () => {
  await createIndexIfNotExists();
  await bulkInsert();
};

module.exports = {
  initialize,
};
