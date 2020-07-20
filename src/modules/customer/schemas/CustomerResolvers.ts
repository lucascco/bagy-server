import { Query, Resolver, Mutation, Arg } from 'type-graphql';
import { Address } from '@modules/address/entities/Address';
import { Customer } from '@modules/customer/entities/Customer';
import { AddAddressInput } from '@modules/address/schemas/types-input/AddAddressInput';
import { AddCustomerInput } from './types-input/AddCustomerInput';

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
