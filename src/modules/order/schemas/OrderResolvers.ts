import { Resolver, Mutation, Arg } from 'type-graphql';
import { TypeReturnCreateOrder } from '../entities/TypeReturnCreateOrder';
import { AddOrderInput } from './types-input/AddOrderInput';
import { OrderService } from '../services/order.service';

@Resolver()
export default class OrderResolvers {
  public orderService = new OrderService();

  @Mutation(() => TypeReturnCreateOrder)
  async createOrder(
    @Arg('order') reqOrder: AddOrderInput,
  ): Promise<TypeReturnCreateOrder> {
    const orderCreated = await this.orderService.execute(reqOrder);
    return orderCreated;
  }
}
