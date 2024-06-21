import { ApolloClient, InMemoryCache } from "@apollo/client";
// Create apollo client for react
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

export default client;
