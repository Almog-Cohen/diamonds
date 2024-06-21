const { Client } = require("@elastic/elasticsearch");

const elasticClient = new Client({
  node: "http://elasticsearch:9200",
  requestTimeout: 40000,
});

module.exports = elasticClient;
