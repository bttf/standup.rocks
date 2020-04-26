import * as React from 'react';
import { Mutation } from 'react-apollo';
import qs from 'query-string';
import gql from 'graphql-tag';
import publicClient from '../../apollo/publicClient';
import onLogin from '../../apollo/onLogin';
import Text from '../../components/Text';

const AUTH_WITH_CAPCAL = gql`
  mutation AuthWithGoogle($code: String!) {
    authWithGoogle(code: $code) {
      token
    }
  }
`;

export default (props: any) => {
  const { location } = props;
  const params = qs.parse(location.search);
  const { code = '' } = params;

  return (
    <Mutation client={publicClient} mutation={AUTH_WITH_CAPCAL}>
      {(authWithGoogle, { called, data, loading }) => {
        if (!called) {
          authWithGoogle({ variables: { code } });
        } else if (called && !loading && data) {
          onLogin({ token: data.authWithGoogle.token });
          window.location.href = '/';
        }
        return (
          <Text color="#808080" font="'Arvo', serif" size={48}>
            Logging you in...
          </Text>
        );
      }}
    </Mutation>
  );
};
