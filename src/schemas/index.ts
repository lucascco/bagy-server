import { buildSchema } from 'type-graphql';
import { GraphQLSchema } from 'graphql';

import CostumerResolvers from './CostumerResolvers';

export default async (): Promise<GraphQLSchema> => {
  const schema = await buildSchema({
    validate: false,
    resolvers: [CostumerResolvers],
  });
  return schema;
};
