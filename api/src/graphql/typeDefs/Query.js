import {gql} from 'apollo-server-koa';

export default gql`
  type Facilitator {
    uuid: String!
    index: Int!
    name: String!
    team: Team!
  }

  type Absentee {
    absentAt: String!
    facilitator: Facilitator!
    team: Team!
  }

  type Standup {
    uuid: String!
    runDate: String!
    facilitator: Facilitator!
    team: Team!
  }

  type Team {
    uuid: String!
    name: String!
    code: String!
    facilitators: [Facilitator!]!
    absentees: [Absentee!]!
    standupOnDate(date: String!): Standup
    standups: [Standup!]!
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
