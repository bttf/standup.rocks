import React from 'react';
import styled from 'styled-components';

import AccountCard from '../../../../components/AccountCard';
import HomeContext from '../../HomeContext';

const AccountsListContainer = styled('div')`
  position: relative;
  min-height: 242px;
  border-radius: 24px;
`;

const AccountsListEmphasizer = styled('div')`
  position: absolute;
  top: -14px;
  right: -14px;
  bottom: -14px;
  left: -14px;
  background-color: transparent;
  border: 4px solid #c56666;
  border-radius: 24px;
  z-index: -1;
`;

export default props => {
  const { accounts = [] } = props;

  return (
    <HomeContext.Consumer>
      {({
        isCreatingCalendar,
        selectingAccountType,
        submitAccountId,
        incomeAccountIdsSelected,
        expenseAccountIdsSelected,
      }) => (
        <AccountsListContainer>
          {accounts.map((a, i) => (
            <AccountCard
              key={`${a.accountId}_${i}`}
              index={i}
              account={a}
              logo={a.institution.logo}
              primaryColor={a.institution.primaryColor}
              institutionName={a.institution.name}
              highlightRed={expenseAccountIdsSelected.includes(a.accountId) && 'Expenses'}
              highlightGreen={incomeAccountIdsSelected.includes(a.accountId) && 'Income'}
              isFaded={
                isCreatingCalendar &&
                ![...incomeAccountIdsSelected, ...expenseAccountIdsSelected].includes(a.accountId)
              }
              onClick={selectingAccountType ? () => submitAccountId(a.accountId) : null}
            />
          ))}

          {!!selectingAccountType && <AccountsListEmphasizer />}
        </AccountsListContainer>
      )}
    </HomeContext.Consumer>
  );
};
