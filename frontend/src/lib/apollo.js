import ApolloClient from 'apollo-boost';
import {LOCAL_STORAGE_TOKEN} from './constants';
import {onLogout} from './auth';

const {NODE_ENV} = process.env;

export const client = new ApolloClient({
  uri:
    NODE_ENV === 'production'
      ? 'https://api.standup.rocks/graphql'
      : 'http://localhost:3000/graphql',
  request: operation => {
    const token = window.localStorage.getItem(LOCAL_STORAGE_TOKEN);
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    });
  },
  onError: ({graphQLErrors, networkErrors}) => {
    if (graphQLErrors) {
      const isUnauthorized =
        graphQLErrors && graphQLErrors.some(e => e.message === 'Unauthorized');

      // Log out and redirect to login page if unauthorized
      if (isUnauthorized) {
        onLogout();
        window.location.href = '/login';
      }

      graphQLErrors.map(({message, locations, path}) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );
    }

    if (networkErrors) {
      // TODO figure out what to do with network errors
      console.log(`[Network error]: ${networkErrors}`);
    }
  },
});
