import {GraphQLObjectType, GraphQLNonNull, GraphQLString} from 'graphql';
// import { getUserAccounts, getUserCalendars } from './resolvers';

export default new GraphQLObjectType({
  name: 'User',
  fields: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
});
