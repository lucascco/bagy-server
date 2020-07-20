import { Repository, EntityRepository, UpdateResult } from 'typeorm';
import { IProductStatus } from '../interfaces/IProductStatus';
import { Product } from '../entities/Product';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  public async updateStock(
    listProductsStatus: IProductStatus[],
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
