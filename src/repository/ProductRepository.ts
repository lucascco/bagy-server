import { Repository, EntityRepository, UpdateResult } from 'typeorm';
import { ProductStatus } from '../interfaces/ProductStatus.interface';
import { Product } from '../models';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  public async updateStock(
    listProductsStatus: ProductStatus[],
  ): Promise<UpdateResult[]> {
    const listProductsStockeUpdate = listProductsStatus
      .filter(productInOrder => !!productInOrder.productDB)
      .map(productInOrder => {
        const { productDB, qttWanted } = productInOrder;
        const { id, qttStock } = productDB as Product;
        return this.update({ id }, { qttStock: qttStock - qttWanted });
      });
    return Promise.all(listProductsStockeUpdate);
  }
}
