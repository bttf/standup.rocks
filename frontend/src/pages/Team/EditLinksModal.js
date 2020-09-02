import React, {useState} from 'react';
import {
  Button,
  Dialog,
  Link,
  ListItem,
  majorScale,
  Pane,
  Text,
  TextInputField,
  UnorderedList,
} from 'evergreen-ui';

export default function EditLinksModal({
  links,
  showEditLinksModal,
  setShowEditLinksModal,
  createLink,
}) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  const onAdd = (name, url) => {
    createLink(name, url);
    setName('');
    setUrl('');
  };

  return (
    <Dialog
      isShown={showEditLinksModal}
      title="Edit team links"
      confirmLabel="Done"
      onCloseComplete={() => setShowEditLinksModal(false)}>
      {Object.keys(links).length > 0 && (
        <UnorderedList>
          {Object.keys(links).map(name => (
            <ListItem>
              <Text>{name} - </Text>
              <Link href={links[name]}>{links[name]}</Link>
            </ListItem>
          ))}
        </UnorderedList>
      )}
      <Pane display="flex" alignItems="center" marginTop={majorScale(3)}>
        <Pane flexGrow={1} marginX={majorScale(1)}>
          <TextInputField
            label="Link name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </Pane>
        <Pane flexGrow={1} marginX={majorScale(1)}>
          <TextInputField
            label="Link URL"
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
        </Pane>
        <Pane flexShrink={1}>
          <Button height={40} onClick={() => onAdd(name, url)}>
            Add
          </Button>
        </Pane>
      </Pane>
    </Dialog>
  );
}
