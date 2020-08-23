import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Alert, Button, Heading, majorScale, Pane, TextInputField } from 'evergreen-ui';
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

export default () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');

  const [createTeamM] = useMutation(CREATE_TEAM_GQL, {
    onCompleted(data) {
      const { createdTeam, errors } = data.createTeam || {};

      if (errors && errors.length) {
        setErrors(errors);
        return;
      } else {
        setErrors([]);
      }

      const { code } = createdTeam;

      window.location.href = `/${code}`;
    },
  });

  const createTeam = () => {
    return createTeamM({
      variables: {
        name,
        password: password ? password : undefined,
      },
    });
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

          <TextInputField
            label="Password (optional)"
            type="password"
            hint="To prevent unwanted visitors"
            value={password}
            onChange={e => setPassword(e.target.value)}
            width={200}
          />

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
    </div>
  );
}
