import { Request } from 'express';

export interface ExpressCustomRequest extends Request {
  filter: Record<string, unknown>[];
  sortBy: [string, string];
}
