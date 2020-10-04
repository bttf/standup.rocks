import React, {useState} from 'react';
import {
  Button,
  CrossIcon,
  Dialog,
  ListItem,
  majorScale,
  Pane,
  Text,
  TextInputField,
  UnorderedList,
} from 'evergreen-ui';

export default ({
  facilitators = [],
  createFacilitator,
  deleteFacilitator,
  showEditFacilitators,
  setShowEditFacilitators,
}) => {
  // TODO This needs to be brought up to parent component
  const [name, setName] = useState('');

  const onAdd = name => {
    createFacilitator(name);
    setName('');
  };

  return (
    <Dialog
      isShown={showEditFacilitators}
      title="Edit facilitators"
      confirmLabel="Done"
      onCloseComplete={() => setShowEditFacilitators(false)}>
      {facilitators.length > 0 && (
        <UnorderedList>
          {facilitators.map((f, i) => (
            <ListItem key={i} display="flex" justifyContent="space-between">
              <Text size={500}>{f.name}</Text>
              <CrossIcon
                color="danger"
                cursor="pointer"
                onClick={() => deleteFacilitator(f.uuid)}
              />
            </ListItem>
          ))}
        </UnorderedList>
      )}
      <Pane display="flex" alignItems="center" marginTop={majorScale(3)}>
        <Pane flexGrow={1} marginX={majorScale(1)}>
          <TextInputField
            label="Facilitator's name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </Pane>
        <Pane flexShrink={1}>
          <Button height={40} onClick={() => onAdd(name)}>
            Add
          </Button>
        </Pane>
      </Pane>
    </Dialog>
  );
};
