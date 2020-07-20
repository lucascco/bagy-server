import { format } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../repository/ProductRepository';
import { ProductStatus } from '../interfaces/ProductStatus.interface';
import { OrderProduct } from '../models/OrderProduct';
import { Order } from '../models';
import { AddOrderInput } from '../schemas/types-input/AddOrderInput';
import { ProductInOrder } from '../schemas/types-input/ProductInOrder';
import { Customer } from '../models/Customer';
import { Product } from '../models/Product';

export class OrderService {
  async execute(
    reqOrder: AddOrderInput,
  ): Promise<{ order: Order; products: Product[] }> {
    const { listProducts, idCustomer, installment } = reqOrder;
    const customer = await Customer.findOne({ where: { id: idCustomer } });
    if (!customer) {
      throw Error(`Customer was not found.`);
    }

    const products = await Product.findByIds(listProducts.map(prod => prod.id));
    const listProductStatus = listProducts.map(prodInOrder =>
      this.createListProductStatus(prodInOrder, products),
    );
    listProductStatus.forEach(prodStatus => {
      if (!prodStatus.productDB) {
        throw Error(`Product ${prodStatus.prodId} was not found.`);
      }
      if (!prodStatus.hasInStock) {
        throw Error(`Product ${prodStatus.productDB.name} out of stock.`);
      }
    });

    const orderSaved = await this.saveOrder({
      customer,
      installment,
    });
    await this.updateStocks(listProductStatus);
    await this.getRelationOrderProduct(orderSaved, listProductStatus);
    const orderProducts = await OrderProduct.find({
      where: { order: orderSaved },
    });
    return {
      order: orderSaved,
      products: orderProducts.map(orderProd => orderProd.product),
    };
  }

  private async updateStocks(
    listProductStatus: ProductStatus[],
  ): Promise<void> {
    const productRepository = getCustomRepository(ProductRepository);
    await productRepository.updateStock(listProductStatus);
  }

  private async saveOrder(dataOrder: {
    customer: Customer;
    installment: number;
  }): Promise<Order> {
    const { customer, installment } = dataOrder;
    const orderCreated = await this.getOrderCreated(customer, installment);
    return orderCreated;
  }

  private async getOrderCreated(customer: Customer, installment: number) {
    const orderCreation = Order.create({
      customer,
      installment,
      status: 'approved',
      dtOrder: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
    });
    return orderCreation.save();
  }

  private async getRelationOrderProduct(
    order: Order,
    listProductStatus: ProductStatus[],
  ) {
    const listSaveOrderProduct = listProductStatus.map(productStatus => {
      const orderProductCreation = OrderProduct.create({
        order,
        product: productStatus.productDB,
        qtt: productStatus.qttWanted,
      });
      return orderProductCreation.save();
    });
    return Promise.all(listSaveOrderProduct);
  }

  private createListProductStatus(
    prodInOrder: ProductInOrder,
    products: Product[],
  ): ProductStatus {
    const productDB = products.find(prod => prod.id === prodInOrder.id);
    const hasInStock = this.checkSotckAvailable(prodInOrder, productDB);
    return {
      hasInStock,
      productDB,
      qttWanted: prodInOrder.qtt,
      prodId: prodInOrder.id,
    };
  }

  private checkSotckAvailable(
    prodInOrder: ProductInOrder,
    product: Product | undefined,
  ): boolean {
    if (!product) {
      return false;
    }
    return prodInOrder.qtt <= product.qttStock;
  }
}
