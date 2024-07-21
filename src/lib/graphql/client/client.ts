import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { AUTH_TOKEN_KEY } from "@/lib/constants";

function getApolloClient() {
  const httpLink = new HttpLink({ uri: "/api/graphql" });
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}

export default getApolloClient;
