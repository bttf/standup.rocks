import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import {
  Alert,
  Button,
  Heading,
  majorScale,
  Pane,
  TextInputField,
  UnorderedList,
  ListItem,
  Text,
  Link,
} from "evergreen-ui";
import { LOCAL_STORAGE_RECENT_TEAMS } from "../lib/constants";
import "./CreateTeam.css";

const CREATE_TEAM_GQL = gql`
  mutation CreateTeam($name: String!, $password: String) {
    createTeam(name: $name, password: $password) {
      createdTeam {
        code
      }
      errors
    }
  }
`;

const isDevelopment = process.env.NODE_ENV !== "production";

const RecentTeamsPanel = ({ recentTeams }) => (
  <Pane
    border="muted"
    width={600}
    marginY={majorScale(2)}
    padding={majorScale(4)}
  >
    Recent teams:
    <UnorderedList>
      {recentTeams.map(({ code, name }) => (
        <ListItem>
          <Text>{name} - </Text>
          <Link
            href={
              isDevelopment
                ? `http://localhost:3001/${code}`
                : `https://standup.rocks/${code}`
            }
          >
            {isDevelopment
              ? `http://localhost:3001/${code}`
              : `https://standup.rocks/${code}`}
          </Link>
        </ListItem>
      ))}
    </UnorderedList>
  </Pane>
);

const CreateTeamForm = ({ updateRecentTeams }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [createTeamM] = useMutation(CREATE_TEAM_GQL);
  const createTeam = async () => {
    const { data } = await createTeamM({
      variables: {
        name,
        password: password ? password : undefined,
      },
    });
    const { createdTeam, errors } = data.createTeam || {};

    if (errors && errors.length) {
      setErrors(errors);
      return;
    } else {
      setErrors([]);
    }

    const { code } = createdTeam;

    updateRecentTeams({ name, code });

    window.location.href = `/${code}`;
  };

  return (
    <Pane flex={1}>
      <Heading size={800} marginBottom={majorScale(2)}>
        Create team
      </Heading>

      <TextInputField
        label="Team name"
        placeholder="Core pod"
        value={name}
        onChange={(e) => setName(e.target.value)}
        width={200}
      />

      {false && (
        <TextInputField
          label="Password (optional)"
          type="password"
          hint="To prevent unwanted visitors"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          width={200}
        />
      )}

      <Button
        appearance="primary"
        onClick={createTeam}
        marginBottom={majorScale(2)}
      >
        Create team
      </Button>

      {errors &&
        errors.map((e, i) => <Alert key={i} intent="danger" title={e} />)}
    </Pane>
  );
};

export default () => {
  const recentTeamsBlob = window.localStorage.getItem(
    LOCAL_STORAGE_RECENT_TEAMS
  );

  const [recentTeams, setRecentTeams] = useState(
    recentTeamsBlob ? JSON.parse(recentTeamsBlob) : []
  );

  const updateRecentTeamsWithNewTeam = (newTeam) => {
    const newRecentTeams = [...recentTeams, newTeam];

    window.localStorage.setItem(
      LOCAL_STORAGE_RECENT_TEAMS,
      JSON.stringify(newRecentTeams)
    );

    setRecentTeams(newRecentTeams);
  };

  return (
    <div className="container">
      <Pane display="flex" border="muted" padding={majorScale(4)} width={600}>
        <CreateTeamForm updateRecentTeams={updateRecentTeamsWithNewTeam} />

        <Pane
          flex={1}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Heading size={900} marginBottom="1rem">
            <span role="img" aria-label="Tada">
              🎉
            </span>{" "}
            standup.rocks
          </Heading>
          <UnorderedList>
            <ListItem>
              One page to run your standups from, with an easily shareable link
            </ListItem>
            <ListItem>Keep track of a rotating facilitator</ListItem>
            <ListItem>
              Easy access to external links like the sprint board, or burndown
              chart
            </ListItem>
            <ListItem>
              Record action items for the day, saved for later access
            </ListItem>
          </UnorderedList>
        </Pane>
      </Pane>

      {!!recentTeams.length && <RecentTeamsPanel recentTeams={recentTeams} />}
      <div>
        © 2022{" "}
        <a href="https://redpine.software" target="_blank" rel="noreferrer">
          Red Pine Software
        </a>
      </div>
    </div>
  );
};
