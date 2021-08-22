import { injectable } from 'inversify';

import { IProductRepository } from './IProductRepository';
import Product from '../../models/Product';
import Category from '../../models/Category';
import Brand from '../../models/Brand';

@injectable()
class ProductRepository implements IProductRepository {
  public async retrieve(filter: Record<string, unknown>): Promise<Product[]> {
    const include = [Brand, Category];

    return await Product.findAll({
      ...filter,
      include,
    });
  }
}

export default ProductRepository;
