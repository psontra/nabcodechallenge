import { NextFunction, Request, Response } from 'express';
import { ExpressCustomRequest } from '../../common/ExpressCustomTypes';

export interface IActivityController {
  create(req: Request, res: Response, next: NextFunction): Promise<void>;
  getActivities(
    req: ExpressCustomRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
}
