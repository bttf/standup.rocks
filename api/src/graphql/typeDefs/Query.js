import {gql} from 'apollo-server-koa';

export default gql`
  type Facilitator {
    index: Int!
    name: String!
    team: Team!
  }

  type Absentee {
    absentAt: String!
    facilitator: Facilitator!
    team: Team!
  }

  type Team {
    name: String!
    code: String!
    facilitators: [Facilitator!]!
    absentees: [Absentee!]!
  }

  type TeamLink {
    name: String!
    logoUrl: String
    url: String!
  }

  type TeamSettings {
    links: [TeamLink!]!
  }


  type Query {
    hello: String!
    findTeam(code: String!): Team
  }
`;
