import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

function getApolloClient() {
  return new ApolloClient({
    link: new HttpLink({ uri: "/api/graphql" }),
    cache: new InMemoryCache(),
  });
}

export default getApolloClient;
