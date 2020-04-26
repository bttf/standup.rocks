import React from 'react';
import styled from 'styled-components';
import ItemCard from '../ItemCard';

const CalendarName = styled('div')`
  font-family: 'Open Sans', sans-serif;
  font-size: 18px;
  color: #000;
`;

const EditLink = styled('div')`
  font-size: 12px;
  text-align: right;
  width: 100%;
  cursor: pointer;
  color: #aaa;
  &:hover {
    text-decoration: underline;
  }
`;

export default props => {
  const { calendar, editCalendar } = props;

  return (
    <ItemCard borderLeft={calendar.backgroundColor}>
      <CalendarName>{calendar.name}</CalendarName>
      <EditLink onClick={editCalendar}>edit</EditLink>
    </ItemCard>
  );
};
