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

  type Mutation {
    createTeam(name: String!, password: String): CreateTeamMutationPayload!
    createStandup(date: String!, facilitatorUuid: String!): CreateStandupMutationPayload!
    createAbsentee(facilitatorUuid: String!): CreateAbsenteeMutationPayload!
    createFacilitator(name: String!, teamUuid: String!): CreateFacilitatorMutationPayload!
    setFacilitatorOrder(uuids: [String!]!): SetFacilitatorOrderMutationPayload!
  }
`;
