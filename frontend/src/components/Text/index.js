import React from 'react';
import styled from 'styled-components';

export const TextContainer = styled('span')`
  font-family: ${p => (p.font ? p.font : `'Open Sans', sans-serif`)};
  font-size: ${p => (p.size ? p.size : 14)}px;
  color: ${p => (p.color ? p.color : 'black')};
  font-weight: ${p => (p.weight ? p.weight : 400)};
`;

export default ({ children, font, color, size, weight }) => (
  <TextContainer font={font} color={color} size={size} weight={weight}>
    {children}
  </TextContainer>
);
