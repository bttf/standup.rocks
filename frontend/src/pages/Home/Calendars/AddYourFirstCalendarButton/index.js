import React from 'react';
import styled from 'styled-components';

import { SignInWithGoogleButton } from '../../../../components/SignInWithGoogleButton';
import Text from '../../../../components/Text';

const CreateCalendarButtonContainer = styled(SignInWithGoogleButton)`
  cursor: pointer;
`;

export default class CreateCalendarButton extends React.Component {
  render() {
    return (
      <CreateCalendarButtonContainer onClick={this.props.onClick}>
        <Text font="'Arvo', serif;" size={22} weight="600">
          + Add your first calendar
        </Text>
      </CreateCalendarButtonContainer>
    );
  }
}
