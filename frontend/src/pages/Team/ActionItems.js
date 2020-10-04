import React, {useState} from 'react';
import {
  Heading,
  ListItem,
  majorScale,
  Pane,
  TextInput,
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
          <TextInput
            marginBottom={majorScale(1)}
            disabled={disabled}
            value={actionItem}
            onChange={e => setActionItem(e.target.value)}
          />
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
