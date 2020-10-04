import React, {useState} from 'react';
import {parseISO, format} from 'date-fns';
import {Dialog, Heading, ListItem, majorScale, Pane} from 'evergreen-ui';

export default ({standups}) => {
  const [showActionItemsModal, setShowActionItemsModal] = useState(false);
  const [selectedStandup, setSelectedStandup] = useState(null);

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
            key={i}
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
            <Heading
              size={500}
              padding={majorScale(2)}
              cursor={s.actionItems.length > 0 ? 'pointer' : 'inherit'}
              color={s.actionItems.length > 0 ? '#1070CA' : 'inherit'}
              onClick={() => {
                if (s.actionItems.length < 1) return;
                setSelectedStandup(s);
                setShowActionItemsModal(true);
              }}>
              {s.actionItems.length > 0
                ? `${s.actionItems.length} Action items`
                : 'No action items'}
            </Heading>
          </Pane>
        ))}
      </Pane>
      {showActionItemsModal && (
        <Dialog
          hasCancel={false}
          isShown={showActionItemsModal}
          title={`Action items on ${format(
            parseISO(selectedStandup.runDate),
            'E LLL do',
          )}`}
          confirmLabel="Close"
          onCloseComplete={() => setShowActionItemsModal(false)}>
          {selectedStandup.actionItems.map((a, i) => (
            <ListItem key={i}>{a.text}</ListItem>
          ))}
        </Dialog>
      )}
    </>
  );
};
