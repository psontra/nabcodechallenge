import { Product, ProductCreationAttributes } from '../../models/Product';

export interface IProductService {
  getProducts(
    filter: Record<string, unknown>[],
    sortBy?: [string, string],
    reqQuery?: Record<string, unknown>,
  ): Promise<Product[]>;
  getProductById(productId: string): Promise<Product>;
  updateById(
    productId: string,
    updateObject: Partial<ProductCreationAttributes>,
  ): Promise<Product>;
  deleteById(productId: string): Promise<void>;
  createProduct(
    createProductData: Partial<ProductCreationAttributes>,
  ): Promise<Product>;
}
