import { Sequelize } from 'sequelize';

export interface ISequelize {
  getInstance(): Sequelize;
}
