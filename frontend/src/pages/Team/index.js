import React, { useState } from "react";
import { debounce } from "lodash";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Heading, majorScale, Pane } from "evergreen-ui";
import { formatISO } from "date-fns";
import { LOCAL_STORAGE_RECENT_TEAMS } from "../../lib/constants";
import socket from "../../lib/socket";
import TopNav from "./TopNav";
import Clock from "./Clock";
import Facilitators from "./Facilitators";
import Links from "./Links";
import EditFacilitatorsModal from "./EditFacilitatorsModal";
import EnterUserNamePrompt from "./EnterUserNamePrompt";
import EditLinksModal from "./EditLinksModal";
import "./Team.css";

const _userName = window.localStorage.getItem("username");

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
      settings {
        links
      }
      todaysStandup: standupOnDate(date: $date) {
        facilitator {
          name
        }
        upNext {
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
        upNext {
          name
        }
      }
      errors
    }
  }
`;

const ADD_LINK_GQL = gql`
  mutation AddLink($teamUuid: String!, $name: String!, $url: String!) {
    addLink(teamUuid: $teamUuid, name: $name, url: $url) {
      link
      errors
    }
  }
`;

const DELETE_STANDUP_GQL = gql`
  mutation DeleteStandup($teamUuid: String!, $date: String!) {
    deleteStandup(teamUuid: $teamUuid, date: $date) {
      errors
    }
  }
`;

/**
 * Reminder: All state needs to be contained in THIS component.
 */
export default ({ match }) => {
  const todaysDateISO = formatISO(new Date(), { representation: "date" });
  const { teamCode } = match.params;
  const [userName, setUserName] = useState(_userName || "");
  const [hasUserName, setHasUserName] = useState(!!_userName);
  const [showEditFacilitators, setShowEditFacilitators] = useState(false);
  const [showEditLinksModal, setShowEditLinksModal] = useState(false);
  const {
    data: allFacilitatorsRes,
    loading: allFacilitatorsLoading,
    refetch: refetchAllFacilitators
  } = useQuery(ALL_FACILITATORS_GQL, {
    variables: { teamCode, date: todaysDateISO }
  });

  const [createFacilitatorM] = useMutation(CREATE_FACILITATOR_GQL, {
    update(
      cache,
      {
        data: {
          createFacilitator: { createdFacilitator: facilitator }
        }
      }
    ) {
      const { findTeam } = cache.readQuery({
        query: ALL_FACILITATORS_GQL,
        variables: { teamCode, date: todaysDateISO }
      });

      cache.writeQuery({
        query: ALL_FACILITATORS_GQL,
        variables: { teamCode, date: todaysDateISO },
        data: {
          findTeam: {
            ...findTeam,
            facilitators: [...(findTeam.facilitators || []), facilitator]
          }
        }
      });
    }
  });

  const [bumpCurrentFacilitatorIndexM] = useMutation(
    BUMP_CURRENT_FACILITATOR_INDEX_GQL,
    {
      update(
        cache,
        {
          data: {
            bumpCurrentFacilitatorIndex: {
              team: { facilitators }
            }
          }
        }
      ) {
        const { findTeam } = cache.readQuery({
          query: ALL_FACILITATORS_GQL,
          variables: { teamCode, date: todaysDateISO }
        });

        console.log("facilitators", facilitators);

        cache.writeQuery({
          query: ALL_FACILITATORS_GQL,
          variables: { teamCode, date: todaysDateISO },
          data: {
            findTeam: {
              ...findTeam,
              facilitators
            }
          }
        });
      }
    }
  );

  const [createStandupM] = useMutation(CREATE_STANDUP_GQL, {
    update(
      cache,
      {
        data: {
          createStandup: { createdStandup: todaysStandup }
        }
      }
    ) {
      const { findTeam } = cache.readQuery({
        query: ALL_FACILITATORS_GQL,
        variables: { teamCode, date: todaysDateISO }
      });

      cache.writeQuery({
        query: ALL_FACILITATORS_GQL,
        variables: { teamCode, date: todaysDateISO },
        data: {
          findTeam: {
            ...findTeam,
            todaysStandup
          }
        }
      });
    }
  });

  const [addLinkM] = useMutation(ADD_LINK_GQL, {
    update(
      cache,
      {
        data: {
          addLink: { link }
        }
      }
    ) {
      const { findTeam } = cache.readQuery({
        query: ALL_FACILITATORS_GQL,
        variables: { teamCode, date: todaysDateISO }
      });

      cache.writeQuery({
        query: ALL_FACILITATORS_GQL,
        variables: { teamCode, date: todaysDateISO },
        data: {
          findTeam: {
            ...findTeam,
            settings: {
              ...findTeam.settings,
              links: {
                ...(findTeam.settings.links || {}),
                ...link
              }
            }
          }
        }
      });
    }
  });

  const [deleteStandupM] = useMutation(DELETE_STANDUP_GQL);

  /**
   * Listen for changes via sockets
   */
  const debouncedRefetchAllFacilitators = debounce(
    () => refetchAllFacilitators(),
    200
  );

  socket.on(`${teamCode}_standup_created`, () => {
    debouncedRefetchAllFacilitators();
  });

  socket.on(`${teamCode}_standup_deleted`, () => {
    debouncedRefetchAllFacilitators();
  });

  socket.on(`${teamCode}_facilitators_bumped`, () => {
    debouncedRefetchAllFacilitators();
  });

  if (!allFacilitatorsRes || !allFacilitatorsRes.findTeam) {
    return (
      <Heading size={900} margin={majorScale(4)}>
        Team not found
      </Heading>
    );
  } else {
    const { name, code } = allFacilitatorsRes.findTeam;
    // TODO Consolidate this implementation with the one in CreateTeam
    try {
      const recentTeamsBlob = window.localStorage.getItem(
        LOCAL_STORAGE_RECENT_TEAMS
      );
      const recentTeams = recentTeamsBlob ? JSON.parse(recentTeamsBlob) : [];
      const existing = recentTeams.find(t => t.code === code);
      if (!existing) {
        const newRecentTeams = [
          ...recentTeams,
          {
            name,
            code
          }
        ];
        window.localStorage.setItem(
          LOCAL_STORAGE_RECENT_TEAMS,
          JSON.stringify(newRecentTeams)
        );
      }
    } catch (e) {
      console.log("Error", e);
    }
  }

  const createFacilitator = (name, teamUuid) => {
    return createFacilitatorM({
      variables: {
        name,
        teamUuid
      }
    });
  };

  const bumpCurrentFacilitatorIndex = teamUuid => {
    return bumpCurrentFacilitatorIndexM({
      variables: {
        teamUuid
      }
    });
  };

  const createStandup = facilitatorUuid => {
    return createStandupM({
      variables: {
        date: todaysDateISO,
        facilitatorUuid
      }
    });
  };

  const addLink = (teamUuid, name, url) => {
    return addLinkM({
      variables: {
        teamUuid,
        name,
        url
      }
    });
  };

  const deleteStandup = teamUuid => {
    return deleteStandupM({
      variables: {
        date: todaysDateISO,
        teamUuid
      }
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
  const links = allFacilitatorsRes
    ? allFacilitatorsRes.findTeam.settings.links
    : [];

  function storeUserName() {
    window.localStorage.setItem("username", userName);
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
          setShowEditLinksModal={setShowEditLinksModal}
        />
        <Pane
          border="muted"
          width="800px"
          marginX="auto"
          marginY={majorScale(2)}
          padding={majorScale(4)}
          elevation={1}
          display="flex"
          flexDirection="column"
        >
          <Heading size={600} marginY={majorScale(1)}>
            Core pod
          </Heading>
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
              deleteStandup={() => deleteStandup(team.uuid)}
            />
          </Pane>
          <Pane>
            <Links
              links={links}
              setShowEditLinksModal={setShowEditLinksModal}
            />
          </Pane>
        </Pane>
      </div>
      <EditFacilitatorsModal
        facilitators={facilitators}
        createFacilitator={name => createFacilitator(name, team.uuid)}
        showEditFacilitators={showEditFacilitators}
        setShowEditFacilitators={setShowEditFacilitators}
      />
      <EditLinksModal
        links={links}
        createLink={(name, url) => addLink(team.uuid, name, url)}
        showEditLinksModal={showEditLinksModal}
        setShowEditLinksModal={setShowEditLinksModal}
      />
    </>
  );
};
