import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Pane, Paragraph } from 'evergreen-ui';
import './Clock.css';

export default () => {
  const [digits, setDigits] = useState('');

  function tick() {
    setDigits(format(new Date(), 'HH:mm:ss:SSS'));
  }

  useEffect(() => {
    setInterval(tick, 5);
  }, []);

  return (
    <Pane className="clock-container">
      <div className="quarter-year">
        {format(new Date(), 'qqq yyyy')} - {format(new Date(), 'MMM do')}
      </div>
      <div className="clock">
        {digits}
      </div>
    </Pane>
  );
};
