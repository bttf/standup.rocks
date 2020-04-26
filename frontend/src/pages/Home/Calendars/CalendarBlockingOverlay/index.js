import React from 'react';
import styled from 'styled-components';
import Text from '../../../../components/Text';

const CalendarBlockingOverlay = styled('div')`
  position: absolute;
  top: 48px;
  right: 30px;
  left: 30px;

  padding: 148px 32px 16px;

  background: rgba(128, 128, 128, 0.6);
  border-radius: 16px;
`;

export default () => (
  <CalendarBlockingOverlay>
    <Text font="'Arvo', serif" color="white" size={36}>
      You will need to connect a bank account first. &nbsp;{' '}
      <span role="img" aria-label="pointing left">
        👈
      </span>
    </Text>
  </CalendarBlockingOverlay>
);
