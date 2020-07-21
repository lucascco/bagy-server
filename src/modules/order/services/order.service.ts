import { AddOrderInput } from '@modules/order/schemas/types-input/AddOrderInput';
import { ProductInOrder } from '@modules/product/schemas/types-input/ProductInOrder';
import { Product } from '@modules/product/entities/Product';
import { IProductStatus } from '@modules/product/interfaces/IProductStatus';
import IProductRepository from '@modules/product/repository/fakes/IProductRepository';
import { ICustomerRepository } from '@modules/customer/repository/ICustomerRepository';
import { Order } from '../entities/Order';
import IOrderRepository from '../repository/IOrderRepository';
import IOrderProductRepository from '../repository/IOrderProductRepository';

export class OrderService {
  constructor(
    private orderRepository: IOrderRepository,
    private orderProductRepository: IOrderProductRepository,
    private productRepository: IProductRepository,
    private customerRepository: ICustomerRepository,
  ) {}

  async execute(
    reqOrder: AddOrderInput,
  ): Promise<{ order: Order; products: Product[] }> {
    const { listProducts, idCustomer, installment } = reqOrder;
    const customer = await this.customerRepository.findeById(idCustomer);
    if (!customer) {
      throw Error(`Customer was not found.`);
    }

    const products = await this.productRepository.findByListIds(
      listProducts.map(prod => prod.id),
    );
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

    const orderSaved = await this.orderRepository.createOrder(
      customer,
      installment,
    );
    await this.productRepository.updateStock(listProductStatus);
    await this.orderProductRepository.createOrderProduct(
      orderSaved,
      listProductStatus,
    );
    const orderProducts = await this.orderProductRepository.findByOrder(
      orderSaved,
    );
    return {
      order: orderSaved,
      products: orderProducts.map(orderProd => orderProd.product),
    };
  }

  private createListProductStatus(
    prodInOrder: ProductInOrder,
    products: Product[],
  ): IProductStatus {
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
