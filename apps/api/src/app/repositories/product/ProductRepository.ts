import { injectable } from 'inversify';
import { OrderItem, Op, FindOptions } from 'sequelize';
import { isEmpty } from 'lodash';

import { IProductRepository } from './IProductRepository';
import { Product, ProductCreationAttributes } from '../../models/Product';
import Category from '../../models/Category';
import Brand from '../../models/Brand';
import { HttpStatusCodes } from '../../common/Enum';

@injectable()
class ProductRepository implements IProductRepository {
  public async retrieve(
    filter: Record<string, unknown>[],
    sortBy?: [string, string],
    options: {
      include: true;
    } = { include: true },
  ): Promise<Product[]> {
    const include = [Brand, Category];
    let orderBy: OrderItem[] = [['updatedOn', 'DESC']];

    if (!isEmpty(sortBy)) {
      orderBy = [sortBy];
    }

    const findOptions: FindOptions = {
      order: orderBy,
    };

    if (!isEmpty(filter)) {
      findOptions.where = {
        [Op.and]: filter,
      };
    }

    if (options.include) {
      findOptions.include = include;
    }

    return await Product.findAll(findOptions);
  }

  public async findOne(
    filter: Record<string, unknown>[],
    options: {
      include: boolean;
    } = { include: true },
  ): Promise<Product> {
    const include = [Brand, Category];
    const findOptions: FindOptions = {};

    if (!isEmpty(filter)) {
      findOptions.where = {
        [Op.and]: filter,
      };
    }

    if (options.include) {
      findOptions.include = include;
    }

    const result = await Product.findOne(findOptions);

    if (isEmpty(result)) {
      throw {
        message: `Product not found`,
        statusCode: HttpStatusCodes.notFound,
      };
    }

    return result;
  }

  public async findById(
    productId: string,
    options: {
      include: true;
    } = { include: true },
  ): Promise<Product> {
    const include = [Brand, Category];
    const findOptions: FindOptions = {
      where: {
        id: {
          [Op.eq]: productId,
        },
      },
    };

    if (options.include) {
      findOptions.include = include;
    }

    const result = await Product.findOne(findOptions);

    if (isEmpty(result)) {
      throw {
        message: `Cannot find product with id ${productId}`,
        statusCode: HttpStatusCodes.notFound,
      };
    }

    return result;
  }

  public async updateById(
    productId: string,
    updateObject: Partial<ProductCreationAttributes>,
  ): Promise<Product> {
    const result = await Product.update(updateObject, {
      where: {
        id: {
          [Op.eq]: productId,
        },
      },
      returning: true,
    });

    if (result[0] === 0 || result.length !== 2 || !result[1][0]) {
      throw {
        message: `Cannot find and update product with id ${productId}`,
        statusCode: HttpStatusCodes.notFound,
      };
    }

    return result[1][0];
  }

  public async deleteById(productId: string): Promise<number> {
    const result = await Product.destroy({
      where: {
        id: {
          [Op.eq]: productId,
        },
      },
    });

    return result;
  }

  public async create(item: ProductCreationAttributes): Promise<Product> {
    return await Product.create(item);
  }
}

export default ProductRepository;
