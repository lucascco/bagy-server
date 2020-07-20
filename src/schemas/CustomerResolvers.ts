import { Query, Resolver, Mutation, Arg } from 'type-graphql';
import { AddAddressInput } from './types-input/AddAddressInput';
import { AddCustomerInput } from './types-input/AddCustomerInput';
import { Address } from '../models/Address';
import { Customer } from '../models/Customer';

@Resolver()
export default class CustomerResolvers {
  @Query(() => [Customer])
  async allCostumers(): Promise<Customer[]> {
    return Customer.find({ relations: ['address', 'orders'] });
  }

  @Mutation(() => Customer)
  async createCustomer(
    @Arg('customer') reqCustomer: AddCustomerInput,
    @Arg('address') reqAddress: AddAddressInput,
  ): Promise<Customer> {
    const addressCreation = Address.create(reqAddress);
    const addressCreated = await addressCreation.save();

    const customerCreation = Customer.create({
      ...reqCustomer,
      address: addressCreated,
    });

    const customer = await customerCreation.save();
    return customer;
  }
}
