import { IProductStatus } from '@modules/product/interfaces/IProductStatus';
import { UpdateResult } from 'typeorm';
import { Product } from '@modules/product/entities/Product';

export default interface IProductRepository {
  updateStock(listProductsStatus: IProductStatus[]): Promise<UpdateResult[]>;
  findByListIds(listIds: number[]): Promise<Product[]>;
}
