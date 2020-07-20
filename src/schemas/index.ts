import { buildSchema } from 'type-graphql';
import { GraphQLSchema } from 'graphql';

import CustomerResolvers from './CustomerResolvers';
import ProductResolvers from './ProductResolvers';
import OrderResolvers from './OrderResolvers';

export default async (): Promise<GraphQLSchema> => {
  const schema = await buildSchema({
    validate: false,
    resolvers: [CustomerResolvers, ProductResolvers, OrderResolvers],
  });
  return schema;
};
