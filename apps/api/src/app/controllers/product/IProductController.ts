import { NextFunction, Request, Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';

import {
  CreateProductRequestSchema,
  UpdateProductRequestSchema,
} from '../../validators/ProductValidator';
import { ExpressCustomRequest } from '../../common/ExpressCustomTypes';

export interface IProductController {
  getProducts(
    req: ExpressCustomRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
  getProductDetail(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
  updateProduct(
    req: ValidatedRequest<UpdateProductRequestSchema>,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
  deleteProduct(req: Request, res: Response, next: NextFunction): Promise<void>;
  createProduct(
    req: ValidatedRequest<CreateProductRequestSchema>,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
}
