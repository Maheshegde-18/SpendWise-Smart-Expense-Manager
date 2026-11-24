import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { typeDefs } from './schema/typeDefs.js';
import { resolvers } from './schema/resolvers.js';

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

await server.start();

app.use(
  '/graphql',
  cors(),
  bodyParser.json(),
  expressMiddleware(server)
);

app.listen(4000, () => {
  console.log('🚀 SpendWise GraphQL server ready at http://localhost:4000/graphql');
});
