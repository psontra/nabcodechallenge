import { NextFunction, Request, Response } from 'express';

export interface IProductController {
  getProducts(req: Request, res: Response, next: NextFunction): Promise<void>;
}
