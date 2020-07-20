import { ObjectType, Field } from 'type-graphql';
import { Product } from './Product';
import { Order } from './Order';

@ObjectType()
export class TypeReturnCreateOrder {
  @Field(() => Order)
  order: Order;

  @Field(() => [Product])
  products: Product[];
}
