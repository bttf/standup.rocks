import React from 'react';
import {
  BanCircleIcon,
  Button,
  Heading,
  IconButton,
  Link,
  majorScale,
  Pane,
  Spinner,
  Text,
  TickCircleIcon,
  UndoIcon,
} from 'evergreen-ui';

export default ({
  todaysStandup,
  facilitators,
  isLoading,
  setShowEditFacilitators,
  bumpCurrentFacilitatorIndex,
  createStandup,
  deleteStandup,
}) => {
  const isFacilitatorConfirmed = !!todaysStandup && !!todaysStandup.facilitator;
  const confirmedFacilitator = !!todaysStandup && todaysStandup.facilitator;
  const upNextFacilitator = !!todaysStandup && todaysStandup.upNext;

  if (isLoading) {
    return <Spinner />;
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
      <Heading size={300} marginY={majorScale(1)}>
        Facilitating today is:
      </Heading>

      <Pane display="flex" alignItems="center">
        <Heading size={900} marginY={majorScale(1)}>
          {isFacilitatorConfirmed
            ? confirmedFacilitator.name
            : `${facilitators[0].name}?`}
        </Heading>

        {isFacilitatorConfirmed ? (
          <Pane display="flex" marginX={majorScale(2)}>
            <IconButton
              icon={UndoIcon}
              intent="default"
              marginRight={majorScale(1)}
              onClick={deleteStandup}
            />
          </Pane>
        ) : (
          <Pane display="flex" marginX={majorScale(2)}>
            <IconButton
              icon={TickCircleIcon}
              intent="success"
              marginRight={majorScale(1)}
              onClick={() => createStandup(facilitators[0].uuid)}
            />
            <IconButton
              icon={BanCircleIcon}
              intent="danger"
              onClick={bumpCurrentFacilitatorIndex}
            />
          </Pane>
        )}
      </Pane>

      {facilitators.length > 1 && (
        <Heading size={300} marginY={majorScale(1)}>
          Up next:{' '}
          {isFacilitatorConfirmed
            ? upNextFacilitator.name
            : facilitators[1].name}
        </Heading>
      )}
    </Pane>
  );
};