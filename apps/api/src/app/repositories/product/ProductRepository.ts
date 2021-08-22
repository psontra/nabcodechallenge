import { injectable } from 'inversify';

import { IProductRepository } from './IProductRepository';
import Product from '../../models/Product';

@injectable()
class ProductRepository implements IProductRepository {
  public async retrieve(filter: Record<string, unknown>): Promise<Product[]> {
    return await Product.findAll(filter);
  }
}

export default ProductRepository;
