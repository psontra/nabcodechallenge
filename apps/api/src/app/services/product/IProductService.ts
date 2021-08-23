import Product from '../../models/Product';

export interface IProductService {
  getProducts(
    filter: Record<string, unknown>[],
    sortBy?: [string, string],
    reqQuery?: Record<string, unknown>,
  ): Promise<Product[]>;
}
