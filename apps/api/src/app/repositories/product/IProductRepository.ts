import Product from '../../models/Product';

export interface IProductRepository {
  retrieve(filter: Record<string, unknown>): Promise<Product[]>;
}
