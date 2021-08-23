import express from 'express';
import { ExpressJoiError } from 'express-joi-validation';

import { ContainerTypes } from './ContainerTypes';

export const ErrorHandler = (
  err: any | ExpressJoiError,
  req: express.Request,
  res: express.Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: express.NextFunction,
): void => {
  if (err && Object.values(ContainerTypes).includes(err.type)) {
    const error: ExpressJoiError = err;

    res.status(400).json(error);
  } else {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).send(err);
    }
  }
};
