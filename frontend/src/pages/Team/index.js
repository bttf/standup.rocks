import React, {useState} from 'react';
import {useQuery, useMutation} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';
import {Button, Heading, majorScale, Pane, TextInputField} from 'evergreen-ui';
import {parseISO, formatISO, format} from 'date-fns';
import {LOCAL_STORAGE_RECENT_TEAMS} from '../../lib/constants';
import TopNav from './TopNav';
import Clock from './Clock';
import Facilitators from './Facilitators';
import Links from './Links';
import EditFacilitatorsModal from './EditFacilitatorsModal';
import EnterUserNamePrompt from './EnterUserNamePrompt';
import './Team.css';

const _userName = window.localStorage.getItem('username');

const ALL_FACILITATORS_GQL = gql`
  query AllFacilitators($teamCode: String!, $date: String!) {
    findTeam(code: $teamCode) {
      uuid
      name
      code
      facilitators {
        uuid
        name
      }
      todaysStandup: standupOnDate(date: $date) {
        facilitator {
          name
        }
      }
    }
  }
`;

const CREATE_FACILITATOR_GQL = gql`
  mutation CreateFacilitator($name: String!, $teamUuid: String!) {
    createFacilitator(name: $name, teamUuid: $teamUuid) {
      createdFacilitator {
        uuid
        name
        index
      }
      errors
    }
  }
`;

const BUMP_CURRENT_FACILITATOR_INDEX_GQL = gql`
  mutation BumpCurrentFacilitatorIndex($teamUuid: String!) {
    bumpCurrentFacilitatorIndex(teamUuid: $teamUuid) {
      team {
        facilitators {
          uuid
          name
        }
      }
    }
  }
`;

const CREATE_STANDUP_GQL = gql`
  mutation CreateStandup($date: String!, $facilitatorUuid: String!) {
    createStandup(date: $date, facilitatorUuid: $facilitatorUuid) {
      createdStandup {
        facilitator {
          name
        }
      }
      errors
    }
  }
`;

/**
 * Reminder: All state needs to be contained in THIS component.
 */
export default ({match}) => {
  const todaysDateISO = formatISO(new Date(), {representation: 'date'});
  const {teamCode} = match.params;
  const [userName, setUserName] = useState(_userName || '');
  const [hasUserName, setHasUserName] = useState(!!_userName);
  const [showEditFacilitators, setShowEditFacilitators] = useState(false);
  const {data: allFacilitatorsRes, loading: allFacilitatorsLoading} = useQuery(
    ALL_FACILITATORS_GQL,
    {
      variables: {teamCode, date: todaysDateISO},
    },
  );

  const [createFacilitatorM] = useMutation(CREATE_FACILITATOR_GQL, {
    update(
      cache,
      {
        data: {
          createFacilitator: {createdFacilitator: facilitator},
        },
      },
    ) {
      const {findTeam} = cache.readQuery({
        query: ALL_FACILITATORS_GQL,
        variables: {teamCode, date: todaysDateISO},
      });

      cache.writeQuery({
        query: ALL_FACILITATORS_GQL,
        variables: {teamCode, date: todaysDateISO},
        data: {
          findTeam: {
            ...findTeam,
            facilitators: [...(findTeam.facilitators || []), facilitator],
          },
        },
      });
    },
  });

  const [bumpCurrentFacilitatorIndexM] = useMutation(
    BUMP_CURRENT_FACILITATOR_INDEX_GQL,
    {
      update(
        cache,
        {
          data: {
            bumpCurrentFacilitatorIndex: {
              team: {facilitators},
            },
          },
        },
      ) {
        const {findTeam} = cache.readQuery({
          query: ALL_FACILITATORS_GQL,
          variables: {teamCode, date: todaysDateISO},
        });

        console.log('facilitators', facilitators);

        cache.writeQuery({
          query: ALL_FACILITATORS_GQL,
          variables: {teamCode, date: todaysDateISO},
          data: {
            findTeam: {
              ...findTeam,
              facilitators,
            },
          },
        });
      },
    },
  );

  const [createStandupM] = useMutation(CREATE_STANDUP_GQL, {
    update(
      cache,
      {
        data: {
          createStandup: {createdStandup: todaysStandup},
        },
      },
    ) {
      const {findTeam} = cache.readQuery({
        query: ALL_FACILITATORS_GQL,
        variables: {teamCode, date: todaysDateISO},
      });

      cache.writeQuery({
        query: ALL_FACILITATORS_GQL,
        variables: {teamCode, date: todaysDateISO},
        data: {
          findTeam: {
            ...findTeam,
            todaysStandup,
          },
        },
      });
    },
  });

  if (!allFacilitatorsRes || !allFacilitatorsRes.findTeam) {
    return (
      <Heading size={900} margin={majorScale(4)}>
        Team not found
      </Heading>
    );
  } else {
    const {name, code} = allFacilitatorsRes.findTeam;
    // TODO Consolidate this implementation with the one in CreateTeam
    try {
      const recentTeamsBlob = window.localStorage.getItem(
        LOCAL_STORAGE_RECENT_TEAMS,
      );
      const recentTeams = recentTeamsBlob ? JSON.parse(recentTeamsBlob) : [];
      const existing = recentTeams.find(t => t.code === code);
      if (!existing) {
        const newRecentTeams = [
          ...recentTeams,
          {
            name,
            code,
          },
        ];
        window.localStorage.setItem(
          LOCAL_STORAGE_RECENT_TEAMS,
          JSON.stringify(newRecentTeams),
        );
      }
    } catch (e) {
      console.log('Error', e);
    }
  }

  const createFacilitator = (name, teamUuid) => {
    return createFacilitatorM({
      variables: {
        name,
        teamUuid,
      },
    });
  };

  const bumpCurrentFacilitatorIndex = teamUuid => {
    return bumpCurrentFacilitatorIndexM({
      variables: {
        teamUuid,
      },
    });
  };

  const createStandup = facilitatorUuid => {
    return createStandupM({
      variables: {
        date: todaysDateISO,
        facilitatorUuid,
      },
    });
  };

  const team = allFacilitatorsRes ? allFacilitatorsRes.findTeam : null;
  const facilitators = allFacilitatorsRes
    ? allFacilitatorsRes.findTeam.facilitators
    : [];
  const absentees = allFacilitatorsRes
    ? allFacilitatorsRes.findTeam.absentees
    : [];
  const todaysStandup = allFacilitatorsRes
    ? allFacilitatorsRes.findTeam.todaysStandup
    : null;

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
        <TopNav
          userName={userName}
          code={teamCode}
          setShowEditFacilitators={setShowEditFacilitators}
        />
        <Pane
          border="muted"
          width="800px"
          marginX="auto"
          marginY={majorScale(2)}
          padding={majorScale(4)}
          elevation={1}
          display="flex"
          flexDirection="column">
          <Clock />
          <Pane marginY={majorScale(2)}>
            <Facilitators
              isLoading={allFacilitatorsLoading}
              absentees={absentees}
              facilitators={facilitators}
              setShowEditFacilitators={setShowEditFacilitators}
              todaysStandup={todaysStandup}
              bumpCurrentFacilitatorIndex={() =>
                bumpCurrentFacilitatorIndex(team.uuid)
              }
              createStandup={createStandup}
            />
          </Pane>
          <Pane marginY={majorScale(2)}>
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
