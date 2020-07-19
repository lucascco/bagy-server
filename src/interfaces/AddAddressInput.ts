import { InputType, Field } from 'type-graphql';

@InputType()
export class AddAddressInput {
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
