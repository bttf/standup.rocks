import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Alert, Button, Heading, majorScale, Pane, TextInputField, UnorderedList, ListItem, Text, Link } from 'evergreen-ui';
import { LOCAL_STORAGE_RECENT_TEAMS } from '../lib/constants';
import './CreateTeam.css';

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

const isDevelopment = process.env.NODE_ENV !== 'production';

export default () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');
  const recentTeamsBlob = window.localStorage.getItem(LOCAL_STORAGE_RECENT_TEAMS);
  const [recentTeams, setRecentTeams] = useState(recentTeamsBlob ? JSON.parse(recentTeamsBlob) : []);

  const [createTeamM] = useMutation(CREATE_TEAM_GQL);

  const createTeam = async () => {
    const { data }= await createTeamM({
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

    // Set recently created teams in local storage
    try {
      const newRecentTeams = [
        ...recentTeams,
        {
          name,
          code,
        }
      ];
      window.localStorage.setItem('recent-teams-created', JSON.stringify(newRecentTeams));
      setRecentTeams(newRecentTeams);
    } catch(e) {
      console.log('Error', e);
    }

    window.location.href = `/${code}`;
  };

  return (
    <div className="container">
      <Pane
        display="flex"
        border="muted"
        padding={majorScale(4)}
        width={600}
      >
        <Pane flex={1}>
          <Heading size={800} marginBottom={majorScale(2)}>
            Create team
          </Heading>

          <TextInputField
            label="Team name"
            placeholder="Core pod"
            value={name}
            onChange={e => setName(e.target.value)}
            width={200}
          />

          {false && (
            <TextInputField
              label="Password (optional)"
              type="password"
              hint="To prevent unwanted visitors"
              value={password}
              onChange={e => setPassword(e.target.value)}
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

          {errors && (errors.map((e, i) => (
            <Alert
              key={i}
              intent="danger"
              title={e}
            />
          )))}
        </Pane>
        <Pane 
          flex={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Heading size={800}>
            <span role="img" aria-label="Tada">
              🎉
            </span>
            {' '}
             standup.rocks
          </Heading>
        </Pane>
      </Pane>
      {recentTeams.length && (
        <Pane
          border="muted"
          width={600}
          padding={majorScale(4)}
        >
          Recently created:
          <UnorderedList>
            {recentTeams.map(({
              code,
              name,
            }) => (
              <ListItem>
                <Text>{name} - </Text>
                <Link
                  href={isDevelopment ? `http://localhost:3001/${code}` : `https://standup.rocks/${code}`}
                >{isDevelopment ? `http://localhost:3001/${code}` : `https://standup.rocks/${code}`}</Link>
              </ListItem>
            ))}
          </UnorderedList>
        </Pane>
      )}
    </div>
  );
}
