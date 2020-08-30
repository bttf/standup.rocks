import React, { useState } from 'react';
import {useQuery} from '@apollo/react-hooks';
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
  const facilitators = allFacilitatorsRes ? allFacilitatorsRes.findTeam.facilitators : null;
  const absentees = allFacilitatorsRes ? allFacilitatorsRes.findTeam.absentees: null;

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
        showEditFacilitators={showEditFacilitators}
        setShowEditFacilitators={setShowEditFacilitators}
      />
    </>
  );
};
