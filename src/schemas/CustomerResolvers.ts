import { Query, Resolver, Mutation, Arg } from 'type-graphql';
import { AddAddressInput } from '../interfaces/AddAddressInput';
import { AddCostumersInput } from '../interfaces/AddCostumersInput';
import { Address } from '../models/Address';
import { Customer } from '../models/Customer';

@Resolver()
export default class CustomerResolvers {
  @Query(() => [Customer])
  async allCostumers(): Promise<Customer[]> {
    return Customer.find({ relations: ['address'] });
  }

  @Mutation(() => Customer)
  async createCostumer(
    @Arg('costumer') reqCostumer: AddCostumersInput,
    @Arg('address') reqAddress: AddAddressInput,
  ): Promise<Customer> {
    const addressCreation = Address.create(reqAddress);
    const addressCreated = await addressCreation.save();

    const costumerCreation = Customer.create({
      ...reqCostumer,
      address: addressCreated,
    });

    const costumer = await costumerCreation.save();
    return costumer;
  }
}
