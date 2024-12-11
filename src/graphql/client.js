import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const HASURA_GRAPHQL_ENDPOINT =
  "https://infinite-warthog-75.hasura.app/v1/graphql";
const HASURA_ADMIN_SECRET = process.env.REACT_APP_HASURA_ADMIN_SECRET;

// HTTP Link for Auth Service (Login, Signup, etc.)
const httpLinkAuth = new HttpLink({
  // uri: "http://localhost:5000/graphql",
  uri: "https://my.subdomain.robibonconstruction.com/graphql",
  credentials: "include",
});

// HTTP Link for Hasura (Chat Feature)
const httpLinkHasura = new HttpLink({
  uri: HASURA_GRAPHQL_ENDPOINT,
});

// Auth Link for setting the authorization header (for Auth API)
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Auth Link for Hasura (using admin secret or token)
const hasuraAuthLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "x-hasura-admin-secret": HASURA_ADMIN_SECRET,
    },
  };
});

const clientAuth = new ApolloClient({
  link: authLink.concat(httpLinkAuth),
  cache: new InMemoryCache(),
});

const clientHasura = new ApolloClient({
  link: hasuraAuthLink.concat(httpLinkHasura),
  cache: new InMemoryCache(),
});

export { clientAuth, clientHasura };
