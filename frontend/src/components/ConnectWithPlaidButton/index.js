import React, { useState } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import PlaidLink from 'react-plaid-link';
import { USER_QUERY } from '../../pages/Home/BankAccounts';
import { PLAID_ENV, PLAID_ITEM_WEBHOOK, PLAID_PUBLIC_KEY } from '../../constants';

const ConnectWithPlaidButton = styled(PlaidLink)`
  font-family: 'Arvo', serif;
  font-size: 27px;

  height: 70px;
  width: 360px;

  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25) !important;
  border-radius: 8px !important;
  border-style: none;
  border: none !important;

  cursor: pointer;
  outline: none;

  transition: transform 50ms;

  &:active {
    border-style: none;
    transform: translateY(2px) scale(0.98);
  }

  img {
    margin-left: 16px;
  }
`;

export const CREATE_PLAID_ITEM = gql`
  mutation CreatePlaidItem($publicToken: String!) {
    createPlaidItem(publicToken: $publicToken) {
      accounts {
        accountId
        name
        mask
        institution {
          name
          logo
          primaryColor
        }
      }
    }
  }
`;

export default () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Mutation mutation={CREATE_PLAID_ITEM} refetchQueries={() => [{ query: USER_QUERY }]}>
      {(createPlaidItem, { called, data }) => {
        return isLoading ? (
          <span>Loading...</span>
        ) : (
          <ConnectWithPlaidButton
            clientName="Capital Calendar"
            env={PLAID_ENV}
            product={['transactions']}
            publicKey={PLAID_PUBLIC_KEY}
            webhook={PLAID_ITEM_WEBHOOK}
            onExit={() => {}}
            onSuccess={(publicToken, metadata) => {
              console.log('onSuccess: metadata', metadata);
              setIsLoading(true);
              createPlaidItem({
                variables: {
                  publicToken,
                },
              });
            }}
          >
            Connect with
            <img alt="Plaid logo" src="/plaid-logo.svg" />
          </ConnectWithPlaidButton>
        );
      }}
    </Mutation>
  );
};
