import {
  Repository,
  EntityRepository,
  UpdateResult,
  getRepository,
} from 'typeorm';
import IProductRepository from '@modules/product/repository/fakes/IProductRepository';
import { Product } from '@modules/product/entities/Product';
import { IProductStatus } from '@modules/product/interfaces/IProductStatus';

@EntityRepository(Product)
export class ProductRepository implements IProductRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async findByListIds(listIds: number[]): Promise<Product[]> {
    return this.ormRepository.findByIds(listIds);
  }

  public async updateStock(
    listProductsStatus: IProductStatus[],
  ): Promise<UpdateResult[]> {
    const listProductsStockeUpdate = listProductsStatus
      .filter(productInOrder => !!productInOrder.productDB)
      .map(productInOrder => {
        const { productDB, qttWanted } = productInOrder;
        const { id, qttStock } = productDB as Product;
        return this.ormRepository.update(
          { id },
          { qttStock: qttStock - qttWanted },
        );
      });
    return Promise.all(listProductsStockeUpdate);
  }
}
