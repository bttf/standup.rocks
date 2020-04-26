import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import CalendarCard from '../../../components/CalendarCard';
import HomeContext from '../HomeContext';
import { ItemContainer, Title } from '../BankAccounts';
import AddYourFirstCalendarButton from './AddYourFirstCalendarButton';
import CreateCalendarForm from './CreateCalendarForm';
import EditCalendarForm from './EditCalendarForm';
import CalendarBlockingOverlay from './CalendarBlockingOverlay';

export const CALENDARS_QUERY = gql`
  query Calendars {
    viewer {
      user {
        accounts(limit: 1) {
          name
        }
        calendars {
          entityId
          name
          backgroundColor
          googleCalendarInSync
          incomeAccounts {
            accountId
          }
          expenseAccounts {
            accountId
          }
        }
      }
    }
  }
`;

export default props => {
  return (
    <Query query={CALENDARS_QUERY}>
      {({ loading, error, data }) => {
        const calendars = loading || !data ? [] : data.viewer.user.calendars;
        const accounts = loading || !data ? [] : data.viewer.user.accounts;

        if (loading) {
          return (
            <ItemContainer>
              <Title>Calendars</Title>
              Loading...
            </ItemContainer>
          );
        }

        return (
          <HomeContext.Consumer>
            {({
              selectedCalendar,
              setSelectedCalendar,
              isCreatingCalendar,
              setIsCreatingCalendar,
              isEditingCalendar,
              setIsEditingCalendar,
              setSelectingAccountType,
              setIncomeAccountIds,
              setExpenseAccountIds,
            }) => (
              <ItemContainer>
                <Title>Calendars</Title>

                {!isCreatingCalendar &&
                  !calendars.length && (
                    <AddYourFirstCalendarButton onClick={() => setIsCreatingCalendar(true)} />
                  )}

                {!isCreatingCalendar &&
                  !isEditingCalendar &&
                  calendars.map(c => (
                    <CalendarCard
                      calendar={c}
                      editCalendar={() => {
                        setSelectedCalendar(c);
                        setIsEditingCalendar(true);
                        setSelectingAccountType(null);
                        setIncomeAccountIds(c.incomeAccounts.map(a => a.accountId));
                        setExpenseAccountIds(c.expenseAccounts.map(a => a.accountId));
                      }}
                    />
                  ))}

                {isEditingCalendar && (
                  <EditCalendarForm
                    calendar={selectedCalendar}
                    cancelForm={() => {
                      setIsEditingCalendar(false);
                      setSelectedCalendar(null);
                      setSelectingAccountType(null);
                      setIncomeAccountIds([]);
                      setExpenseAccountIds([]);
                    }}
                  />
                )}

                {isCreatingCalendar && (
                  <CreateCalendarForm
                    cancelForm={() => {
                      setSelectingAccountType(null);
                      setIncomeAccountIds([]);
                      setExpenseAccountIds([]);
                      setIsCreatingCalendar(false);
                    }}
                  />
                )}

                {!accounts.length && <CalendarBlockingOverlay />}
              </ItemContainer>
            )}
          </HomeContext.Consumer>
        );
      }}
    </Query>
  );
};
