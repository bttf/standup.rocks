import React, {useState} from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';

import Text from '../../components/Text';

export default () => {
  return (
    <Query query={HOME_QUERY}>
      {({loading, error, data}) => {
        if (loading) {
          return (
            <Text color="#808080" font="'Arvo', serif" size={48}>
              Loading...
            </Text>
          );
        }

        const viewer = data && data.viewer;

        if (!viewer) return null;

        return <div>Hello viewer</div>;
      }}
    </Query>
  );
};

const HOME_QUERY = gql`
  query {
    viewer {
      user {
        email
      }
    }
  }
`;
