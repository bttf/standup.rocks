import React from 'react';
import styled from 'styled-components';

const Link = styled('a')`
  color: #697796;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
`;

export default ({ onClick, href, children }) => (
  <Link onClick={onClick} href={href}>
    {children}
  </Link>
);
