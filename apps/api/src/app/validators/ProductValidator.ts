import * as Joi from '@hapi/joi';
import 'joi-extract-type';
import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';

export const createProductValidator = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  brandId: Joi.string().required(),
  color: Joi.string().optional(),
  categoryId: Joi.string().required(),
});

export interface CreateProductRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: Joi.extractType<typeof createProductValidator>;
}

export const updateProductValidator = Joi.object({
  name: Joi.string().optional(),
  price: Joi.number().optional(),
  brandId: Joi.string().optional(),
  color: Joi.string().optional(),
  categoryId: Joi.string().optional(),
});

export interface UpdateProductRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: Joi.extractType<typeof updateProductValidator>;
}
