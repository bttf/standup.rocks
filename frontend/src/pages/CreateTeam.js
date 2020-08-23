import React from 'react';
import { majorScale, Pane } from 'evergreen-ui';

export default () => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Pane border="muted" padding={majorScale(4)}>
      Create team
    </Pane>
  </div>
);
