import { gql } from "apollo-boost";

export const ALL_FACILITATORS_GQL = gql`
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
        uuid
        facilitator {
          name
        }
        upNext {
          name
        }
        actionItems {
          text
        }
      }
      standups {
        uuid
        runDate
        facilitator {
          name
        }
        actionItems {
          text
        }
      }
    }
  }
`;

export const CREATE_FACILITATOR_GQL = gql`
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

export const BUMP_CURRENT_FACILITATOR_INDEX_GQL = gql`
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

export const CREATE_STANDUP_GQL = gql`
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

export const ADD_LINK_GQL = gql`
  mutation AddLink($teamUuid: String!, $name: String!, $url: String!) {
    addLink(teamUuid: $teamUuid, name: $name, url: $url) {
      link
      errors
    }
  }
`;

export const DELETE_STANDUP_GQL = gql`
  mutation DeleteStandup($teamUuid: String!, $date: String!) {
    deleteStandup(teamUuid: $teamUuid, date: $date) {
      errors
    }
  }
`;

export const DELETE_FACILITATOR_GQL = gql`
  mutation DeleteFacilitator($uuid: String!) {
    deleteFacilitator(uuid: $uuid) {
      deletedFacilitator {
        name
      }
      errors
    }
  }
`;

export const DELETE_LINK_GQL = gql`
  mutation DeleteLink($teamUuid: String!, $name: String!) {
    deleteLink(teamUuid: $teamUuid, name: $name) {
      errors
    }
  }
`;

export const CREATE_ACTION_ITEM_GQL = gql`
  mutation CreateActionItem($text: String!, $standupUuid: String!) {
    createActionItem(text: $text, standupUuid: $standupUuid) {
      actionItem {
        text
      }
      errors
    }
  }
`;
