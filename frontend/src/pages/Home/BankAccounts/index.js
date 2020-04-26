import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

import ConnectWithPlaidButton from '../../../components/ConnectWithPlaidButton';
import AccountsPaginator from './AccountsPaginator';
import AccountsList from './AccountsList';
import AddPlaidAccountButton from './AddPlaidAccountButton';

export const ItemContainer = styled('div')`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const Title = styled('div')`
  font-family: 'Arvo', serif;
  color: #808080;
  font-size: 24px;
  padding: 0 16px;
  margin-bottom: 32px;
`;

const AddPlaidAccountButtonContainer = styled('div')`
  position: absolute;
  top: 8px;
  left: -64px;
`;

export default props => {
  return (
    <Query query={USER_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...';

        const hasAccounts = !!data.viewer.user.accounts.length;

        return (
          <ItemContainer>
            <Title>Bank Accounts</Title>

            {hasAccounts && (
              <AccountsPaginator>
                {accounts => (
                  <React.Fragment>
                    <AddPlaidAccountButtonContainer>
                      <AddPlaidAccountButton />
                    </AddPlaidAccountButtonContainer>

                    <AccountsList accounts={accounts} />
                  </React.Fragment>
                )}
              </AccountsPaginator>
            )}

            {!hasAccounts && <ConnectWithPlaidButton hasAccounts={hasAccounts} />}
          </ItemContainer>
        );
      }}
    </Query>
  );
};

export const USER_QUERY = gql`
  query {
    viewer {
      user {
        accounts(limit: 1) {
          name
        }
      }
    }
  }
`;
