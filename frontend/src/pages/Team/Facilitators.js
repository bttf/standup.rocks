import React from 'react';
import { Button, Heading, Link, majorScale, Pane, Spinner, Text } from 'evergreen-ui';

export default ({
  facilitators,
  isLoading,
  setShowEditFacilitators,
}) => {
  if (isLoading) {
    return <Spinner />
  }

  if (facilitators.length < 1) {
    return (
      <>
        <Button onClick={() => setShowEditFacilitators(true)}>
          Set a list of facilitators
        </Button>
      </>
    );
  }

  return (
    <Pane>
    </Pane>
  );
};
