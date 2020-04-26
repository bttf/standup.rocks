import { GraphQLObjectType } from 'graphql';
import ViewerType from './viewer';

export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    viewer: {
      type: ViewerType,
      resolve: (_, args, { viewer }) => viewer,
    },
  },
});
