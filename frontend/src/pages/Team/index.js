import React, { useState } from 'react';
import { Button, Heading, majorScale, Pane, TextInputField } from 'evergreen-ui';
import TopNav from './TopNav';
import Clock from './Clock';
import Facilitators from './Facilitators';
import Links from './Links';
import './Team.css';

const _userName = window.localStorage.getItem('username');

/**
 * Reminder: All state needs to be contained in THIS component.
 */
export default ({ match }) => {
  const { teamCode } = match.params;
  const [userName, setUserName] = useState(_userName || '');
  const [hasUserName, setHasUserName] = useState(!!_userName);

  function storeUserName() {
    window.localStorage.setItem('username', userName);
    setHasUserName(true);
  }

  if (!hasUserName) {
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

  return (
    <div className="team-container">
      <TopNav code={teamCode} />
      <Pane
        flexGrow={1}
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Clock />
        <Facilitators />
        <Links />
      </Pane>
    </div>
  );
};
