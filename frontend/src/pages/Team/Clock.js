import React, {useState, useEffect} from 'react';
import {format} from 'date-fns';
import {Heading, Pane, Paragraph} from 'evergreen-ui';

export default () => {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setTimeout(() => setTick((tick + 1) % 2), 1000);
  }, [tick]);

  return (
    <Pane className="clock-container">
      <Heading size={900}>
        <span>{format(new Date(), 'hh')}</span>
        <span style={{visibility: tick === 0 ? 'hidden' : 'visible'}}>:</span>
        <span>{format(new Date(), 'mm a')}</span>
      </Heading>
      <Paragraph>
        {format(new Date(), 'qqq yyyy')} - {format(new Date(), 'MMM do')}
      </Paragraph>
    </Pane>
  );
};
