import express from 'express';
import { ExpressJoiError } from 'express-joi-validation';
import { get } from 'lodash';

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
    const errorMessage = get(err, 'message') || err;
    const statusCode = get(err, 'statusCode') || 500;

    res.status(statusCode).json({
      error: errorMessage,
      success: false,
    });
  }
};
