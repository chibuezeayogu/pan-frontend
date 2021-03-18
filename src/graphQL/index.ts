import { onError, ErrorResponse } from "@apollo/client/link/error";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from
} from "@apollo/client";
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const link = from([
  errorLink,
  new HttpLink({ uri: 'https://pangaea-interviews.now.sh/api/graphql' }),
]);

const client = new ApolloClient ({ cache: new InMemoryCache, link: link });

export default client;
