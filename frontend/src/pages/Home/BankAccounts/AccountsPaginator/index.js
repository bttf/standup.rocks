import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

import { TextContainer } from '../../../../components/Text';

const Container = styled('div')`
  position: relative;
`;

const Paginator = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 16px 32px;
`;

const Nav = styled(TextContainer).attrs({ size: 18 })`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export default class AccountsPaginator extends React.Component {
  state = { offset: 0, limit: 3 };

  prevPage = fetchMore => () => {
    const { offset, limit } = this.state;

    if (offset - limit < 0) return null;

    fetchMore({
      variables: {
        offset: offset - limit,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (
          !fetchMoreResult ||
          !fetchMoreResult.viewer ||
          !fetchMoreResult.viewer.user ||
          !fetchMoreResult.viewer.user.accounts ||
          !fetchMoreResult.viewer.user.accounts.length
        )
          return prev;

        this.setState({ offset: offset - limit });

        return Object.assign({}, prev, {
          viewer: {
            ...prev.viewer,
            user: {
              ...prev.viewer.user,
              accounts: fetchMoreResult.viewer.user.accounts,
            },
          },
        });
      },
    });
  };

  nextPage = fetchMore => () => {
    const { offset, limit } = this.state;

    fetchMore({
      variables: {
        offset: offset + limit,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (
          !fetchMoreResult ||
          !fetchMoreResult.viewer ||
          !fetchMoreResult.viewer.user ||
          !fetchMoreResult.viewer.user.accounts ||
          !fetchMoreResult.viewer.user.accounts.length
        )
          return prev;

        this.setState({ offset: offset + limit });

        return Object.assign({}, prev, {
          viewer: {
            ...prev.viewer,
            user: {
              ...prev.viewer.user,
              accounts: fetchMoreResult.viewer.user.accounts,
            },
          },
        });
      },
    });
  };

  render() {
    const { children } = this.props;

    return (
      <Query
        query={PAGINATED_ACCOUNTS_QUERY}
        variables={{
          offset: 0,
          limit: 3,
        }}
      >
        {({ loading, error, data, fetchMore }) => {
          if (loading) return 'Loading...';
          if (error) return error;

          const accounts = data.viewer.user.accounts;

          return (
            <Container>
              {children(accounts)}

              <Paginator>
                <Nav color="#697796" onClick={this.prevPage(fetchMore)}>
                  Prev
                </Nav>
                <Nav color="#697796" onClick={this.nextPage(fetchMore)}>
                  Next
                </Nav>
              </Paginator>
            </Container>
          );
        }}
      </Query>
    );
  }
}

export const PAGINATED_ACCOUNTS_QUERY = gql`
  query PaginatedAccounts($offset: Int, $limit: Int) {
    viewer {
      user {
        accounts(offset: $offset, limit: $limit) {
          accountId
          name
          mask
          loginRequired
          itemPublicToken
          plaidItemId
          institution {
            name
            logo
            primaryColor
          }
        }
      }
    }
  }
`;
