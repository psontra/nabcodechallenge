import { inject, injectable } from 'inversify';
import { get } from 'lodash';

import { IProductController } from './IProductController';
import { NextFunction, Request, Response } from 'express';
import Types from '../../common/Ioc/Types';
import { IProductService } from '../../services/product/IProductService';
import Logger from '../../common/Logger';
import {
  transformProduct,
  TransformedProduct,
} from '../../transformers/ProductTransformer';

@injectable()
class ProductController implements IProductController {
  constructor(
    @inject(Types.IProductService) private _productService: IProductService,
  ) {}

  public async getProducts(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const products = await this._productService.getProducts(
        get(req, 'filter'),
      );
      const transformedProducts: TransformedProduct[] =
        products.map(transformProduct);

      res.json(transformedProducts);
    } catch (err) {
      Logger.error('Error getting product list', err);

      next(err);
    }
  }
}

export default ProductController;
