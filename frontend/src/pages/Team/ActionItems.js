import React, {useState} from 'react';
import {
  Heading,
  ListItem,
  majorScale,
  Pane,
  TextInput,
  Tooltip,
  UnorderedList,
} from 'evergreen-ui';

export default ({actionItems, createActionItem, disabled, standup}) => {
  const [actionItem, setActionItem] = useState('');

  return (
    <Pane>
      <Heading size={600} marginBottom={majorScale(2)}>
        Action items
      </Heading>
      <Pane>
        <form
          disabled={disabled}
          onSubmit={e => {
            e.preventDefault();
            createActionItem(standup.uuid, actionItem);
            setActionItem('');
          }}>
          <Tooltip content="You'll need to confirm the facilitator first">
            <Pane>
              <TextInput
                marginBottom={majorScale(1)}
                disabled={disabled}
                value={actionItem}
                onChange={e => setActionItem(e.target.value)}
              />
            </Pane>
          </Tooltip>
        </form>
      </Pane>
      <Pane>
        <UnorderedList>
          {actionItems.map((a, i) => (
            <ListItem key={i}>{a.text}</ListItem>
          ))}
        </UnorderedList>
      </Pane>
    </Pane>
  );
};
