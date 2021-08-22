import { NextFunction, Response } from 'express';
import { get, toString, isEmpty } from 'lodash';

import { ExpressCustomRequest } from './ExpressCustomTypes';
import OperatorMap from './db/OperatorMap';

const parseQuery = (
  req: ExpressCustomRequest,
  res: Response,
  next: NextFunction,
): void => {
  if (isEmpty(req.query)) {
    return next();
  }

  req.filter = [];

  for (const item in req.query) {
    if (item !== 'sortBy') {
      const queryArray = item.split('__');

      if (queryArray && queryArray.length === 2) {
        const operator = get(OperatorMap, queryArray[1]);

        if (operator) {
          let value = toString(get(req.query, item));

          if (operator === OperatorMap.contain) {
            value = handleLikeOperator(value);
          }

          req.filter.push({
            [queryArray[0]]: {
              [operator]: value,
            },
          });
        }
      }
    } else {
      const sortBy: string[] = toString(get(req.query, 'sortBy')).split(':');

      if (sortBy && sortBy.length === 2) {
        const sortOperator: string =
          sortBy[1].toLowerCase() === 'asc' ? 'ASC' : 'DESC';

        req.sortBy = [sortBy[0], sortOperator];
      }
    }
  }

  return next();
};

// For LIKE operator we need the string to have '%' at the start or the end or both
const handleLikeOperator = (value: string): string => {
  const valueSplit = toString(value).split('');

  if (!isEmpty(valueSplit)) {
    if (valueSplit[0] === '%' || valueSplit[valueSplit.length - 1] === '%') {
      return valueSplit.join('');
    }

    valueSplit.unshift('%');
    valueSplit.push('%');
  }

  return valueSplit.join('');
};

export default parseQuery;
