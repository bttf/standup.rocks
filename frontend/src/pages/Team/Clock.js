import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Pane, Paragraph } from 'evergreen-ui';
import './Clock.css';

export default () => {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setTimeout(() => setTick((tick + 1) % 2), 1000);
  }, [tick]);

  return (
    <Pane className="clock-container">
      <div className="quarter-year">
        {format(new Date(), 'qqq yyyy')} - {format(new Date(), 'MMM do')}
      </div>
      <div className="clock">
        <span>{format(new Date(), 'hh')}</span>
        <span style={{ visibility: tick === 0 ? 'hidden' : 'visible' }}>:</span>
        <span>{format(new Date(), 'mm a')}</span>
      </div>
    </Pane>
  );
};
