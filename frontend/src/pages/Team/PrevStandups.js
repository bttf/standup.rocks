import React from 'react';
import {parseISO, format} from 'date-fns';
import {Heading, majorScale, Pane} from 'evergreen-ui';

export default ({standups}) => {
  if (!standups || !standups.length) {
    return null;
  }

  return (
    <>
      <Heading size={900} marginBottom={majorScale(4)}>
        Previous standups
      </Heading>
      <Pane display="flex" flexWrap="wrap" marginBottom={majorScale(4)}>
        {standups.map((s, i) => (
          <Pane
            elevation={1}
            width="180px"
            height="200px"
            marginRight={majorScale(2)}
            marginBottom={majorScale(4)}>
            <Pane background="blueTint">
              <Heading size={600} padding={majorScale(2)}>
                {format(parseISO(s.runDate), 'E LLL do')}
              </Heading>
            </Pane>
            <Heading
              size={500}
              padding={majorScale(2)}
              overflow="hidden"
              textOverflow="ellipsis">
              Run by: {s.facilitator ? s.facilitator.name : '<deleted>'}
            </Heading>
            <Heading size={500} padding={majorScale(2)}>
              7 Action items
            </Heading>
          </Pane>
        ))}
      </Pane>
    </>
  );
};
