import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { CAPCAL_API_HOST } from '../constants';

import { LOCAL_STORAGE_CAPCAL_TOKEN_PATH } from '../constants';
import onLogout from './onLogout';

const httpLink = new HttpLink({
  uri: `${CAPCAL_API_HOST}/graphql`,
});

const authLink = setContext((request, prevContext) => {
  const token = localStorage.getItem(LOCAL_STORAGE_CAPCAL_TOKEN_PATH);
  return {
    ...prevContext,
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

/**
 * Catch errors at the graphql - network level. If a message comes back as
 * unauthorized, redirect to login page.
 */
const errorLink = onError(({ graphQLErrors, networkErrors }) => {
  if (graphQLErrors) {
    const isUnauthorized = graphQLErrors && graphQLErrors.some(e => e.message === 'Unauthorized');

    // Log out and redirect to login page if unauthorized
    if (isUnauthorized) {
      onLogout();
      window.location.href = '/login';
    }

    graphQLErrors.map(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
    );
  }

  if (networkErrors) {
    // TODO figure out what to do with network errors
    console.log(`[Network error]: ${networkErrors}`);
  }
});

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
