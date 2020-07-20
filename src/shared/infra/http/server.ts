import 'reflect-metadata';
import express from 'express';

import initDb from '../database/index';
import initGraphQl from './graphql/index';

const start = async () => {
  await initDb();
  console.log('Database created.');

  const app = express();
  const apolloServer = await initGraphQl(app);

  app.listen(4000, () =>
    console.log(
      `Server started on http://localhost:4000${apolloServer.graphqlPath}`,
    ),
  );
};

start();
