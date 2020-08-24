import React from 'react';
import { Heading, Link, majorScale, Pane, Spinner, Text } from 'evergreen-ui';

export default ({
  facilitators,
  isLoading,
  setShowEditFacilitators,
}) => {
  if (isLoading) {
    return <Spinner />
  }

  return (
    <Pane
      display="flex"
      alignItems="baseline"
      width="100%"
      marginY={majorScale(2)}
    >
      <Pane flex={1} display="flex" flexDirection="column" alignItems="flex-end" marginX={majorScale(1)}>
        <Heading size={900}>
          Facilitator
        </Heading>
        <Link cursor="pointer" onClick={() => setShowEditFacilitators(true)}>Edit</Link>
      </Pane>
      <Pane flex={1} justifyContent="flex-start" marginX={majorScale(2)}>
        {facilitators.length === 0 ? (
          <>
            <Text>You have no facilitators set. Select 'edit' to continue.</Text>
          </>
        ) : (
          <div></div>
        )}
      </Pane>
    </Pane>
  );
};
