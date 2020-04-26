import React from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import publicClient from '../../apollo/publicClient';

export const SignInWithGoogleButton = styled('button')`
  font-family: 'Arvo', serif;
  font-size: 27px;

  height: 70px;
  width: 360px;

  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  border-style: none;

  cursor: pointer;
  outline: none;

  transition: transform 50ms;

  img {
    margin-right: 16px;
  }

  &:active {
    border-style: none;
    transform: translateY(2px) scale(0.98);
  }
`;

export default () => (
  <Query
    client={publicClient}
    query={gql`
      query {
        googleAuthUrl
      }
    `}
  >
    {({ loading, error, data }) => {
      const openURL = () => {
        const url = data && data.googleAuthUrl;

        if (url) {
          window.location.href = url;
        }
      };

      return (
        <SignInWithGoogleButton onClick={openURL}>
          <img src="/g-logo.png" alt="google logo" style={{ height: '48px', width: '48px' }} />
          Sign in with Google
        </SignInWithGoogleButton>
      );
    }}
  </Query>
);
