import React from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import onLogout from '../../apollo/onLogout';

const TopNavContainer = styled('div')`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;

  padding: 0 16px;
`;

const ActionsContainer = styled('div')``;

const Action = styled('a')`
  padding: 0 16px;
  cursor: pointer;
  font-size: 24px;
  font-family: 'Arvo', serif;
  color: #697796;
`;

export default () => (
  <Query
    query={gql`
      query {
        viewer {
          user {
            email
          }
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return null;

      if (error) {
        console.error('TopNav error', error);
        return null;
      }

      const viewer = data && data.viewer;

      if (!viewer) return null;

      return (
        <TopNavContainer>
          <ActionsContainer>
            <Action>Billing</Action>
            <Action>FAQ</Action>
          </ActionsContainer>
          <ActionsContainer>
            <Action onClick={onLogout}>Sign out</Action>
          </ActionsContainer>
        </TopNavContainer>
      );
    }}
  </Query>
);
