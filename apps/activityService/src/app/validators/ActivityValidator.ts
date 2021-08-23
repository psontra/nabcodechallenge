import * as Joi from '@hapi/joi';
import 'joi-extract-type';
import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';

export const createActivityValidator = Joi.object({
  resourceId: Joi.string().optional(),
  resourceName: Joi.string().required(),
  type: Joi.string().required(),
  content: Joi.string().required(),
  occurred: Joi.string().optional(),
});

export interface CreateActivityRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: Joi.extractType<typeof createActivityValidator>;
}
