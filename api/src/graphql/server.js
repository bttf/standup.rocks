import {ApolloServer} from 'apollo-server-koa';
import typeDefs from 'src/graphql/typeDefs';
import resolvers from 'src/graphql/resolvers';

const genContext = ({ctx}) => {
  return {};
};

export default new ApolloServer({typeDefs, resolvers, context: genContext});
