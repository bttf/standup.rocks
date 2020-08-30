import React, { useState } from 'react';
import {useQuery, useMutation} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';
import { Button, Heading, majorScale, Pane, TextInputField } from 'evergreen-ui';
import TopNav from './TopNav';
import Clock from './Clock';
import Facilitators from './Facilitators';
import Links from './Links';
import EditFacilitatorsModal from './EditFacilitatorsModal'
import EnterUserNamePrompt from './EnterUserNamePrompt';
import './Team.css';

const _userName = window.localStorage.getItem('username');

const ALL_FACILITATORS_GQL = gql`
  query AllFacilitators($teamCode: String!) {
    findTeam(code: $teamCode) {
      uuid
      facilitators {
        name
      }
      absentees {
        facilitator {
          name
        }
      }
    }
  }
`;

const CREATE_FACILITATOR_GQL = gql`
  mutation CreateFacilitator(
    $name: String!
    $teamUuid: String!
  ) {
    createFacilitator(
      name: $name
      teamUuid: $teamUuid
    ) {
      createdFacilitator {
        name
        index
      }
      errors
    }
  }
`;

/**
 * Reminder: All state needs to be contained in THIS component.
 */
export default ({ match }) => {
  const { teamCode } = match.params;
  const [userName, setUserName] = useState(_userName || '');
  const [hasUserName, setHasUserName] = useState(!!_userName);
  const [showEditFacilitators, setShowEditFacilitators] = useState(false);
  const {
    data: allFacilitatorsRes,
    loading: allFacilitatorsLoading,
  } = useQuery(ALL_FACILITATORS_GQL, {
    variables: { teamCode },
  });
  const [createFacilitatorM] = useMutation(CREATE_FACILITATOR_GQL, {
    update(cache, { data: { createFacilitator: { createdFacilitator: facilitator } } }) {
      const { findTeam } = cache.readQuery({
        query: ALL_FACILITATORS_GQL,
        variables: { teamCode },
      });

      cache.writeQuery({
        query: ALL_FACILITATORS_GQL,
        variables: { teamCode },
        data: {
          findTeam: {
            ...findTeam,
            facilitators: [
              ...(findTeam.facilitators || []),
              facilitator,
            ],
          },
        },
      });
    }
  });
  const createFacilitator = (name, teamUuid) => {
    return createFacilitatorM({
      variables: {
        name,
        teamUuid,
      }
    });
  };
  const team = allFacilitatorsRes ? allFacilitatorsRes.findTeam : null;
  const facilitators = allFacilitatorsRes ? allFacilitatorsRes.findTeam.facilitators : [];
  const absentees = allFacilitatorsRes ? allFacilitatorsRes.findTeam.absentees: [];

  function storeUserName() {
    window.localStorage.setItem('username', userName);
    setHasUserName(true);
  }

  if (!hasUserName) {
    return (
      <EnterUserNamePrompt
        userName={userName}
        setUserName={setUserName}
        storeUserName={storeUserName}
      />
    );
  }

  return (
    <>
      <div className="team-container">
        <TopNav code={teamCode} />
        <Pane
          flexGrow={1}
          width="800px"
          marginX="auto"
          marginY={0}
          display="flex"
          flexDirection="column"
        >
          <Clock />
          <Pane
            marginY={majorScale(2)}
          >
            <Facilitators
              isLoading={allFacilitatorsLoading}
              absentees={absentees}
              facilitators={facilitators}
              setShowEditFacilitators={setShowEditFacilitators}
            />
          </Pane>
          <Pane
            marginY={majorScale(2)}
          >
            <Links />
          </Pane>
        </Pane>
      </div>
      <EditFacilitatorsModal
        facilitators={facilitators}
        createFacilitator={name => createFacilitator(name, team.uuid)}
        showEditFacilitators={showEditFacilitators}
        setShowEditFacilitators={setShowEditFacilitators}
      />
    </>
  );
};
