import React from 'react';
import { Button } from 'evergreen-ui';

export default ({
  links = []
}) => {
  if (links.length < 1) {
    return (
      <>
        <Button onClick={() => {}}>
          Set a list of links for the team's convenience
        </Button >
      </>
    );
  }

  return (
    <div>Links</div>
  );
};
