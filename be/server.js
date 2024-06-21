const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const typeDefs = require("./schemas/index");
const resolvers = require("./resolvers/index");
const { initialize } = require("./insertDiamonds");

const startServer = async () => {
  const app = express();

  // Security Libraries nice to have
  // const helmet = require("helmet");
  // const cors = require("cors");
  // const rateLimit = require("express-rate-limit");

  // app.use(helmet());
  // app.use(cors());
  // const limiter = rateLimit({
  //   windowMs: 15 * 60 * 1000, // 15 minutes
  //   max: 100 // Limit each IP to 100 requests per windowMs
  // });
  // app.use(limiter);
  //

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({}),
  });

  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  app.use(express.static(path.join(__dirname, "public")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });

  try {
    // Initialize Elasticsearch and insert diamonds before starting the server
    await initialize();
    console.log("Elasticsearch initialized and diamonds inserted successfully.");
  } catch (error) {
    console.error("Failed to initialize Elasticsearch:", error);
    process.exit(1);
  }

  const PORT = process.env.PORT || 4000;
  app.listen({ port: PORT }, () => {
    console.log(`Server is running on http://localhost:${PORT}/graphql`);
  });
};

process.on("SIGINT", async () => {
  process.exit(0);
});

process.on("SIGTERM", async () => {
  process.exit(0);
});

startServer().catch((error) => console.error(error));
