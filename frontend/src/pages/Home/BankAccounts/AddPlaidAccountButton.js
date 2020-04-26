import React from 'react';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import PlaidLink from 'react-plaid-link';
import { CREATE_PLAID_ITEM } from '../../../components/ConnectWithPlaidButton';
import { PAGINATED_ACCOUNTS_QUERY } from '../../../pages/Home/BankAccounts/AccountsPaginator';
import { PLAID_ENV, PLAID_ITEM_WEBHOOK, PLAID_PUBLIC_KEY } from '../../../constants';

const PlusButton = styled(PlaidLink)`
  display: flex;
  align-items: center;
  justify-content: center;

  color: #777;
  height: 32px;
  width: 32px
  border-radius: 16px !important;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25) !important;

  cursor: pointer;
`;

const noop = () => {};

export default () => {
  return (
    <React.Fragment>
      <Mutation
        mutation={CREATE_PLAID_ITEM}
        refetchQueries={() => [
          { query: PAGINATED_ACCOUNTS_QUERY, variables: { offset: 0, limit: 3 } },
        ]}
      >
        {(createPlaidItem, { called, data, loading }) => (
          <React.Fragment>
            <PlusButton
              clientName="Capital Calendar"
              product={['transactions']}
              env={PLAID_ENV}
              publicKey={PLAID_PUBLIC_KEY}
              webhook={PLAID_ITEM_WEBHOOK}
              onSuccess={publicToken => {
                createPlaidItem({
                  variables: {
                    publicToken,
                  },
                });
              }}
              onExit={noop}
            >
              +
            </PlusButton>
          </React.Fragment>
        )}
      </Mutation>
    </React.Fragment>
  );
};
