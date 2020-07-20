import { Product } from '../models';

export interface ProductStatus {
  hasInStock: boolean;
  productDB: Product | undefined;
  qttWanted: number;
  prodId: number;
}
