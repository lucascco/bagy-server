import { buildSchema } from 'type-graphql';
import { GraphQLSchema } from 'graphql';

import CustomerResolvers from './CustomerResolvers';

export default async (): Promise<GraphQLSchema> => {
  const schema = await buildSchema({
    validate: false,
    resolvers: [CustomerResolvers],
  });
  return schema;
};
