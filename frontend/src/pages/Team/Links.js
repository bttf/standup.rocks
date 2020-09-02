import React from 'react';
import {
  Button,
  Heading,
  Link,
  ListItem,
  Pane,
  Text,
  UnorderedList,
} from 'evergreen-ui';

export default ({links = [], setShowEditLinksModal}) => {
  if (Object.keys(links).length < 1) {
    return (
      <>
        <Button onClick={() => setShowEditLinksModal(true)}>
          Set a list of links for the team's convenience
        </Button>
      </>
    );
  }

  return (
    <Pane>
      <Heading size={600}>Links</Heading>
      <UnorderedList>
        {Object.keys(links).map(name => (
          <ListItem>
            <Text>{name} - </Text>
            <Link href={links[name]} target="_blank">
              {links[name]}
            </Link>
          </ListItem>
        ))}
      </UnorderedList>
    </Pane>
  );
};
