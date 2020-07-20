import { Resolver, Mutation, Arg } from 'type-graphql';
import { TypeReturnCreateOrder } from '../models/TypeReturnCreateOrder';
import { OrderService } from '../services/order.service';
import { AddOrderInput } from './types-input/AddOrderInput';

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
