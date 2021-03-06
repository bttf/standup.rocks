import {gql} from 'apollo-server-koa';

export default gql`
  type CreateTeamMutationPayload {
    createdTeam: Team
    errors: [String!]
  }

  type CreateStandupMutationPayload {
    createdStandup: Standup
    errors: [String!]
  }

  type CreateAbsenteeMutationPayload {
    createdAbsentee: Absentee
    errors: [String!]
  }

  type CreateFacilitatorMutationPayload {
    createdFacilitator: Facilitator
    errors: [String!]
  }

  type SetFacilitatorOrderMutationPayload {
    facilitators: [Facilitator!]
    errors: [String!]
  }

  type DeleteFacilitatorMutationPayload {
    deletedFacilitator: Facilitator!
    errors: [String!]
  }

  type BumpCurrentFacilitatorIndexMutationPayload {
    team: Team
    errors: [String!]
  }

  type AddLinkMutationPayload {
    link: JSON
    errors: [String!]
  }

  type DeleteLinkMutationPayload {
    deletedLink: JSON
    errors: [String!]
  }

  type DeleteStandupMutationPayload {
    deletedStandup: Standup
    errors: [String!]
  }

  type CreateActionItemPayload {
    actionItem: ActionItem
    errors: [String!]
  }

  type Mutation {
    createTeam(name: String!, password: String): CreateTeamMutationPayload!
    createStandup(
      date: String!
      facilitatorUuid: String!
    ): CreateStandupMutationPayload!
    createAbsentee(facilitatorUuid: String!): CreateAbsenteeMutationPayload!
    createFacilitator(
      name: String!
      teamUuid: String!
    ): CreateFacilitatorMutationPayload!
    setFacilitatorOrder(uuids: [String!]!): SetFacilitatorOrderMutationPayload!
    deleteFacilitator(uuid: String!): DeleteFacilitatorMutationPayload!
    bumpCurrentFacilitatorIndex(
      teamUuid: String!
    ): BumpCurrentFacilitatorIndexMutationPayload!
    addLink(
      teamUuid: String!
      url: String!
      name: String!
    ): AddLinkMutationPayload!
    deleteLink(teamUuid: String!, name: String!): DeleteLinkMutationPayload!
    deleteStandup(
      teamUuid: String!
      date: String!
    ): DeleteStandupMutationPayload!
    createActionItem(
      text: String!
      standupUuid: String!
    ): CreateActionItemPayload!
  }
`;
