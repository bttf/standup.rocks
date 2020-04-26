/**
 * This component is straight copy and pasted from create form. DRY it up pls.
 */
import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Formik, Field } from 'formik';
import styled from 'styled-components';
import Button from '../../../../components/Button';
import HomeContext from '../../HomeContext';
import { CALENDARS_QUERY } from '../../Calendars';
import CadenceSelector from '../CreateCalendarForm/CadenceSelector';

const EDIT_CALENDAR = gql`
  mutation EditCalendar(
    $calendarEntityId: String!
    $expenseAccountIds: [String!]!
    $incomeAccountIds: [String!]!
  ) {
    editCalendar(
      calendarEntityId: $calendarEntityId
      expenseAccountIds: $expenseAccountIds
      incomeAccountIds: $incomeAccountIds
    ) {
      calendar {
        name
        cadence
      }
    }
  }
`;

const EditCalendarFormContainer = styled('div')`
  width: 360px;

  border-radius: 8px;

  padding: 16px;
  box-shadow: inset 0px 1px 4px rgba(0, 0, 0, 0.25);
`;

const CalendarNameInput = styled('input', { type: 'text' })`
  border: 0;
  font-size: 18px;
  width: 100%;
`;

const FormLabel = styled('div')`
  font-weight: 600;
  font-size: 14px;
  color: #808080;
  margin: 8px 0;
`;

const Color = styled('span')`
  color: ${p => p.color};
`;

const AccountSelectorButton = styled(Button)`
  background-color: ${p => (p.expenses ? '#C56666' : '#6A9669')};
  color: white;
  font-weight: 600;
  padding: 8px;
`;

const ButtonsContainer = styled('div')`
  display: flex;
  justify-content: space-between;

  padding-top: 16px;

  width: 392px;
`;

const CancelButton = styled(Button)`
  flex: 1;
  margin-right: 8px;
  font-family: 'Arvo', serif;
  font-size: 14px;
`;

const SaveButton = styled(Button, { type: 'submit' })`
  flex: 1;
  background-color: #697796;
  color: white;
  font-family: 'Arvo', serif;
  padding: 8px;
  font-size: 14px;
  margin-left: 8px;
`;

export default props => {
  const { calendar, cancelForm } = props;
  const [isCreating, setIsCreating] = useState(false);

  return (
    <Mutation mutation={EDIT_CALENDAR} refetchQueries={() => [{ query: CALENDARS_QUERY }]}>
      {(editCalendar, { called, data, loading }) => {
        if (loading) return 'Loading...';

        return (
          <HomeContext.Consumer>
            {({
              selectingAccountType,
              setSelectingAccountType,
              incomeAccountIdsSelected,
              expenseAccountIdsSelected,
            }) => (
              <Formik
                initialValues={{ cadence: 'DAILY' }}
                onSubmit={async values => {
                  setIsCreating(true);
                  try {
                    await editCalendar({
                      variables: {
                        calendarEntityId: calendar.entityId,
                        expenseAccountIds: expenseAccountIdsSelected,
                        incomeAccountIds: incomeAccountIdsSelected,
                      },
                    });
                    cancelForm();
                  } catch (e) {
                    setIsCreating(false);
                    alert('Error');
                    console.error(e);
                  }
                }}
              >
                {({ values, errors, handleChange, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <EditCalendarFormContainer>
                      <CalendarNameInput
                        placeholder="Calendar name"
                        name="name"
                        onChange={handleChange}
                        value={values.name}
                      />

                      <FormLabel>Cadence</FormLabel>

                      <Field name="cadence" component={CadenceSelector} />

                      <FormLabel>
                        Measure <Color color="#C56666">expenses</Color> from{' '}
                        {expenseAccountIdsSelected.length} accounts
                      </FormLabel>

                      <AccountSelectorButton
                        expenses
                        disabled={selectingAccountType === 'income'}
                        onClick={e => {
                          e.preventDefault();
                          setSelectingAccountType(
                            selectingAccountType === 'expenses' ? null : 'expenses',
                          );
                        }}
                      >
                        {selectingAccountType === 'expenses' ? 'Done' : 'Select accounts'}
                      </AccountSelectorButton>

                      <FormLabel>
                        Measure <Color color="#6A9669">income</Color> from{' '}
                        {incomeAccountIdsSelected.length} accounts
                      </FormLabel>

                      <AccountSelectorButton
                        disabled={selectingAccountType === 'expenses'}
                        onClick={e => {
                          e.preventDefault();
                          setSelectingAccountType(
                            selectingAccountType === 'income' ? null : 'income',
                          );
                        }}
                      >
                        {selectingAccountType === 'income' ? 'Done' : 'Select accounts'}
                      </AccountSelectorButton>
                    </EditCalendarFormContainer>
                    <ButtonsContainer>
                      <CancelButton disabled={isCreating} onClick={cancelForm}>
                        Cancel
                      </CancelButton>
                      <SaveButton disabled={isCreating}>
                        {isCreating ? 'Saving...' : 'Save calendar'}
                      </SaveButton>
                    </ButtonsContainer>
                  </form>
                )}
              </Formik>
            )}
          </HomeContext.Consumer>
        );
      }}
    </Mutation>
  );
};
