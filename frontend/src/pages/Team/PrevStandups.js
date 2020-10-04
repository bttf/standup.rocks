import React from 'react';
import {parseISO, format} from 'date-fns';
import {Heading, majorScale, Pane} from 'evergreen-ui';

export default ({standups}) => {
  return (
    <>
      <Heading size={900} marginBottom={majorScale(4)}>
        Previous standups
      </Heading>
      <Pane display="flex" marginBottom={majorScale(4)}>
        {standups.map((s, i) => (
          <Pane
            elevation={1}
            width="200px"
            height="200px"
            marginRight={majorScale(4)}>
            <Pane background="blueTint">
              <Heading size={700} padding={majorScale(2)}>
                {format(parseISO(s.runDate), 'E LLL do')}
              </Heading>
            </Pane>
            <Heading
              size={600}
              padding={majorScale(2)}
              overflow="hidden"
              textOverflow="ellipsis">
              Run by: {s.facilitator.name}
            </Heading>
            <Heading size={600} padding={majorScale(2)}>
              7 Action items
            </Heading>
          </Pane>
        ))}
      </Pane>
    </>
  );
};
