import { injectable } from 'inversify';
import { OrderItem, Op, FindOptions } from 'sequelize';
import { isEmpty } from 'lodash';

import { IProductRepository } from './IProductRepository';
import Product from '../../models/Product';
import Category from '../../models/Category';
import Brand from '../../models/Brand';

@injectable()
class ProductRepository implements IProductRepository {
  public async retrieve(
    filter: Record<string, unknown>[],
    sortBy?: [string, string],
  ): Promise<Product[]> {
    const include = [Brand, Category];
    let orderBy: OrderItem[] = [['id', 'DESC']];

    if (!isEmpty(sortBy)) {
      orderBy = [sortBy];
    }

    const options: FindOptions = {
      include,
      order: orderBy,
    };

    if (!isEmpty(filter)) {
      options.where = {
        [Op.and]: filter,
      };
    }

    return await Product.findAll(options);
  }
}

export default ProductRepository;
