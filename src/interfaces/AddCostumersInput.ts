import { InputType, Field } from 'type-graphql';
import { Costumer } from '../models/Customer';

@InputType()
export class AddCostumersInput implements Partial<Costumer> {
  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  cpf: string;

  @Field(() => String)
  dtBirth: string;
}
