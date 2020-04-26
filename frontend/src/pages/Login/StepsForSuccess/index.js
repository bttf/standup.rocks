import React from 'react';
import styled from 'styled-components';

const StepsContainer = styled('div')`
  margin-top: 32px;
  padding: 16px 32px;

  background: #f4f4f4;
  border-radius: 16px;
`;

const StepsTitle = styled('div')`
  font-weight: bold;
  font-size: 24px;
  color: #697796;
  text-align: center;
  margin-bottom: 16px;
`;

const NumberBullet = styled('div')`
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 28px;
  width: 28px;
  border-radius: 14px;
  margin-right: 16px;

  color: #f4f4f4;
  background-color: #c4c4c4;

  font-size: 18px;
  font-weight: bold;
`;

const BulletPoint = styled('div')`
  display: flex;
  align-items: center;
  font-size: 18px;
  margin-bottom: 16px;
`;

export default () => (
  <StepsContainer>
    <StepsTitle>Steps for success</StepsTitle>
    <BulletPoint>
      <NumberBullet>1</NumberBullet>
      Sign in with Google
    </BulletPoint>
    <BulletPoint>
      <NumberBullet>2</NumberBullet>
      Pick and choose which bank accounts to monitor daily
    </BulletPoint>
    <BulletPoint>
      <NumberBullet>3</NumberBullet>
      Create one or many calendars for any bank accounts.
    </BulletPoint>
    <BulletPoint>
      <NumberBullet>4</NumberBullet>
      Watch your spending data fill up the last 30 days and everyday thereafter!
    </BulletPoint>
  </StepsContainer>
);
