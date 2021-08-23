import { inject, injectable } from 'inversify';
import { NextFunction, Response, Request } from 'express';
import { ValidatedRequest } from 'express-joi-validation';

import { IProductController } from './IProductController';
import Types from '../../common/Ioc/Types';
import { IProductService } from '../../services/product/IProductService';
import Logger from '../../common/Logger';
import {
  transformProduct,
  TransformedProduct,
} from '../../transformers/ProductTransformer';
import { ExpressCustomRequest } from '../../common/ExpressCustomTypes';
import {
  CreateProductRequestSchema,
  UpdateProductRequestSchema,
} from '../../validators/ProductValidator';

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
        req.query,
      );
      const transformedProducts: TransformedProduct[] =
        products.map(transformProduct);

      res.json({
        data: transformedProducts,
        success: true,
      });
    } catch (err) {
      Logger.error('Error getting product list ', err);

      return next(err);
    }
  }

  public async getProductDetail(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const product = await this._productService.getProductById(
        req.params.productId,
      );
      const transformedProduct: TransformedProduct = transformProduct(product);

      res.json({
        data: transformedProduct,
        success: true,
      });
    } catch (err) {
      Logger.error('Error getting product detail ', err);

      return next(err);
    }
  }

  public async updateProduct(
    req: ValidatedRequest<UpdateProductRequestSchema>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const product = await this._productService.updateById(
        req.params.productId,
        req.body,
      );
      const transformedProduct: TransformedProduct = transformProduct(product);

      res.json({
        data: transformedProduct,
        success: true,
      });
    } catch (err) {
      Logger.error('Error updating product ', err);

      return next(err);
    }
  }

  public async deleteProduct(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      await this._productService.deleteById(req.params.productId);

      res.json({
        success: true,
      });
    } catch (err) {
      Logger.error('Error deleting product ', err);

      return next(err);
    }
  }

  public async createProduct(
    req: ValidatedRequest<CreateProductRequestSchema>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const product = await this._productService.createProduct(req.body);
      const transformedProduct: TransformedProduct = transformProduct(product);

      res.json({
        data: transformedProduct,
        success: true,
      });
    } catch (err) {
      Logger.error('Error creating product ', err);

      return next(err);
    }
  }
}

export default ProductController;
