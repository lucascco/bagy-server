import { InputType, Field } from 'type-graphql';
import { Product } from '../../models/Product';

@InputType()
export class AddProductInput implements Partial<Product> {
  @Field(() => String)
  name: string;

  @Field(() => String)
  image: string;

  @Field(() => String)
  description: string;

  @Field(() => Number)
  weight: number;

  @Field(() => Number)
  price: number;

  @Field(() => Number)
  qttStock: number;
}
