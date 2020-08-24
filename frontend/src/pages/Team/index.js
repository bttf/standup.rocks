import React, { useState } from 'react';
import {useQuery} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';
import { Button, Heading, majorScale, Pane, TextInputField } from 'evergreen-ui';
import TopNav from './TopNav';
import Clock from './Clock';
import Facilitators from './Facilitators';
import Links from './Links';
import EditFacilitatorsModal from './EditFacilitatorsModal'
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
      <Pane
        border="muted"
        elevation={1}
        padding={majorScale(4)}
      >
        <Heading size={800} marginBottom={majorScale(2)}>
          Enter your name
        </Heading>

        <TextInputField
          label="Name"
          placeholder="First name preferably"
          value={userName}
          onChange={e => setUserName(e.target.value)}
          width={200}
        />

        <Button appearance="primary" onClick={storeUserName}>
          Done
        </Button>
      </Pane>
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
          alignItems="center"
          justifyContent="center"
        >
          <Clock />
          <Facilitators
            isLoading={allFacilitatorsLoading}
            absentees={absentees}
            facilitators={facilitators}
            setShowEditFacilitators={setShowEditFacilitators}
          />
          <Links />
        </Pane>
      </div>
      <EditFacilitatorsModal
        showEditFacilitators={showEditFacilitators}
        setShowEditFacilitators={setShowEditFacilitators}
      />
    </>
  );
};
