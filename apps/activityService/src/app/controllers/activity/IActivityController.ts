import { NextFunction, Request, Response } from 'express';

export interface IActivityController {
  create(req: Request, res: Response, next: NextFunction): Promise<void>;
}
