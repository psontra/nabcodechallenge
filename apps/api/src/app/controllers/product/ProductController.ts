import { inject, injectable } from 'inversify';

import { IProductController } from './IProductController';
import { NextFunction, Response } from 'express';
import Types from '../../common/Ioc/Types';
import { IProductService } from '../../services/product/IProductService';
import Logger from '../../common/Logger';
import {
  transformProduct,
  TransformedProduct,
} from '../../transformers/ProductTransformer';
import { ExpressCustomRequest } from '../../common/ExpressCustomTypes';

@injectable()
class ProductController implements IProductController {
  constructor(
    @inject(Types.IProductService) private _productService: IProductService,
  ) {}

  public async getProducts(
    req: ExpressCustomRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const products = await this._productService.getProducts(
        req.filter,
        req.sortBy,
      );
      const transformedProducts: TransformedProduct[] =
        products.map(transformProduct);

      res.json(transformedProducts);
    } catch (err) {
      Logger.error('Error getting product list', err);

      return next(err);
    }
  }
}

export default ProductController;
