import { InputType, Field } from 'type-graphql';
import { Address } from '../../models/Address';

@InputType()
export class AddAddressInput implements Partial<Address> {
  @Field(() => String)
  street: string;

  @Field(() => String)
  neighborhood: string;

  @Field(() => String)
  city: string;

  @Field(() => String)
  state: string;

  @Field(() => String)
  country: string;

  @Field(() => String)
  cep: string;

  @Field(() => String)
  number: string;
}
