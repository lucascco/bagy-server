import { Query, Resolver, Mutation, Arg } from 'type-graphql';
import { AddAddressInput } from '../interfaces/AddAddressInput';
import { AddCostumersInput } from '../interfaces/AddCostumersInput';
import { Address } from '../models/Address';
import { Costumer } from '../models/Customer';

@Resolver()
export default class CostumerResolvers {
  @Query(() => [Costumer])
  async allCostumers(): Promise<Costumer[]> {
    return Costumer.find({ relations: ['address'] });
  }

  @Mutation(() => Costumer)
  async createCostumer(
    @Arg('costumer') reqCostumer: AddCostumersInput,
    @Arg('address') reqAddress: AddAddressInput,
  ): Promise<Costumer> {
    const addressCreation = Address.create(reqAddress);
    const addressCreated = await addressCreation.save();

    const costumerCreation = Costumer.create({
      ...reqCostumer,
      address: addressCreated,
    });

    const costumer = await costumerCreation.save();
    return costumer;
  }
}
