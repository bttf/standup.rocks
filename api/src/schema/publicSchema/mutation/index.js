import { GraphQLObjectType } from 'graphql';
import authWithGoogle from './authWithGoogle';

export default new GraphQLObjectType({
  name: 'PublicMutation',
  fields: {
    authWithGoogle,
  },
});
