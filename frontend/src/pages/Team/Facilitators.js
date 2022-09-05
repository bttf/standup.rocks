import React from "react";
import {
  BanCircleIcon,
  Button,
  Heading,
  IconButton,
  majorScale,
  Pane,
  Paragraph,
  Small,
  Spinner,
  TickCircleIcon,
  UndoIcon,
} from "evergreen-ui";

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
      <Pane>
        <Button onClick={() => setShowEditFacilitators(true)}>
          Add team members
        </Button>
      </Pane>
    );
  }

  return (
    <Pane marginY={majorScale(3)}>
      <Heading size={600} marginY={majorScale(1)}>
        {isFacilitatorConfirmed
          ? "Facilitating today is:"
          : "Who is facilitating today?"}{" "}
        {!isFacilitatorConfirmed && (
          <Paragraph muted>
            <Small>Once confirmed, facilitator will rotate the next day</Small>
          </Paragraph>
        )}
      </Heading>

      <Pane display="flex" alignItems="center">
        <Heading size={900} marginY={majorScale(1)}>
          {isFacilitatorConfirmed
            ? confirmedFacilitator.name
            : facilitators[0].name}
        </Heading>

        {isFacilitatorConfirmed ? (
          <Pane display="flex" marginX={majorScale(2)}>
            <IconButton
              icon={UndoIcon}
              intent="none"
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
        <>
          <Heading size={400} marginY={majorScale(1)}>
            Up next:{" "}
            {isFacilitatorConfirmed
              ? upNextFacilitator.name
              : facilitators[1].name}
          </Heading>
        </>
      )}
    </Pane>
  );
};
