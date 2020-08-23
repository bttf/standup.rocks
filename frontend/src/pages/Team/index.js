import React from 'react';
import { Pane } from 'evergreen-ui';
import TopNav from './TopNav';
import './Team.css';

/**
 * Reminder: All state needs to be contained in THIS component.
 */
export default ({ match }) => {
  const { teamCode } = match.params;

  return (
    <div className="team-container">
      <TopNav code={teamCode} />
      <Pane flexGrow={1} width="100%">
      </Pane>
    </div>
  );
};
