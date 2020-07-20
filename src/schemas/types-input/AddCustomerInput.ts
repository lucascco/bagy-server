import { InputType, Field } from 'type-graphql';
import { Customer } from '../../models/Customer';

@InputType()
export class AddCustomerInput implements Partial<Customer> {
  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  cpf: string;

  @Field(() => String)
  dtBirth: string;
}
