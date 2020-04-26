import {GraphQLObjectType, GraphQLNonNull} from 'graphql';
import UserType from '../user';

export default new GraphQLObjectType({
  name: 'Viewer',
  fields: {
    user: {
      type: new GraphQLNonNull(UserType),
    },
  },
});
