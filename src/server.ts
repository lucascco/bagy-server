import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';

import initDb from './database/index';
import schemaResolvers from './schemas/index';

const start = async () => {
  await initDb();
  console.log('Database created.');

  const schema = await schemaResolvers();
  const apolloServer = new ApolloServer({ schema });

  const app = express();
  apolloServer.applyMiddleware({ app });

  app.listen(4000, () =>
    console.log(
      `Server started on http://localhost:4000${apolloServer.graphqlPath}`,
    ),
  );
};

start();
