import { Op } from 'sequelize';

const OperatorMap = {
  eq: Op.eq,
  contain: Op.like,
  lt: Op.lt,
  lte: Op.lte,
  gt: Op.gt,
  gte: Op.gte,
};

export default OperatorMap;
