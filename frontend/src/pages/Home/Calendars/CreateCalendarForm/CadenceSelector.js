import React from 'react';
import styled from 'styled-components';

const CadenceSelectorContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 8px 16px;

  border-radius: 4px;
  box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.25);

  margin-bottom: 16px;
`;

const CadenceOptionText = styled('div')`
  cursor: pointer;
  font-weight: 600;
  color: ${p => (p.isSelected ? '#808080' : '#C4C4C4')};

  &:hover {
    color: #697796;
  }
`;

export default props => {
  const { field } = props;
  const { value, onChange } = field;

  const onCadenceChange = onChange('cadence');

  return (
    <CadenceSelectorContainer>
      <CadenceOptionText isSelected={value === 'DAILY'} onClick={() => onCadenceChange('DAILY')}>
        Daily
      </CadenceOptionText>
      <CadenceOptionText isSelected={value === 'WEEKLY'} onClick={() => onCadenceChange('WEEKLY')}>
        Weekly
      </CadenceOptionText>
      <CadenceOptionText
        isSelected={value === 'MONTHLY'}
        onClick={() => onCadenceChange('MONTHLY')}
      >
        Monthly
      </CadenceOptionText>
    </CadenceSelectorContainer>
  );
};
