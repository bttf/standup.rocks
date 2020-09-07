import React from 'react';
import { Button, Heading, majorScale, Pane, TextInputField } from 'evergreen-ui';

export default ({
  userName,
  setUserName,
  storeUserName,
}) => {
  return (
    <Pane
      border="muted"
      elevation={1}
      padding={majorScale(4)}
    >
      <Heading size={800} marginBottom={majorScale(2)}>
        Enter your name
      </Heading>
  
      <TextInputField
        label="Name"
        placeholder="First name preferably"
        value={userName}
        onChange={e => setUserName(e.target.value)}
        width={200}
      />
  
      <Button appearance="primary" onClick={storeUserName}>
        Done
      </Button>
    </Pane>
  );
}
