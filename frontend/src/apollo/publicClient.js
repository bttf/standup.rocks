import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { CAPCAL_API_HOST } from '../constants';

const httpLink = new HttpLink({
  uri: `${CAPCAL_API_HOST}/public/graphql`,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
