import { buildSchema } from 'type-graphql';
import { GraphQLSchema } from 'graphql';

import CustomerResolvers from './CustomerResolvers';
import ProductResolvers from './ProductResolvers';

export default async (): Promise<GraphQLSchema> => {
  const schema = await buildSchema({
    validate: false,
    resolvers: [CustomerResolvers, ProductResolvers],
  });
  return schema;
};
