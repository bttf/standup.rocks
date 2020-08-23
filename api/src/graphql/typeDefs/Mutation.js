import {gql} from 'apollo-server-koa';

export default gql`
  type CreateTeamMutationPayload {
    createdTeam: Team
    errors: [String!]
  }

  type Mutation {
    createTeam(name: String!, password: String): CreateTeamMutationPayload!
  }
`;
