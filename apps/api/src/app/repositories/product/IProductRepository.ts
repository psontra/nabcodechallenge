import { Product, ProductCreationAttributes } from '../../models/Product';

export interface IProductRepository {
  retrieve(
    filter: Record<string, unknown>[],
    sortBy: [string, string],
    options?: {
      include: true;
    },
  ): Promise<Product[]>;
  findOne(
    filter: Record<string, unknown>[],
    options?: {
      include: true;
    },
  ): Promise<Product>;
  findById(
    productId: string,
    options?: {
      include: true;
    },
  ): Promise<Product>;
  updateById(
    productId: string,
    updateObject: Partial<ProductCreationAttributes>,
  ): Promise<Product>;
  deleteById(productId: string): Promise<number>;
  create(item: ProductCreationAttributes): Promise<Product>;
}
