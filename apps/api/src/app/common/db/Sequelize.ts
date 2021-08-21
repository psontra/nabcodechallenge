import { Sequelize } from 'sequelize';
import config from 'config';
import { injectable } from 'inversify';

import { ISequelize } from './ISequelize';

@injectable()
class SequelizeClass implements ISequelize {
  private _sequelize: Sequelize;

  constructor() {
    this._initializeConnection();
  }

  private _initializeConnection() {
    const dbConfig: {
      user: string;
      password: string;
      host: string;
      name: string;
    } = config.get('dbConfig');
    const username = dbConfig.user || 'postgres';
    const password = dbConfig.password || '123';
    const dbName = dbConfig.name || 'iCommerce';
    const host = dbConfig.host || '127.0.0.1';

    this._sequelize = new Sequelize(dbName, username, password, {
      host,
      dialect: 'postgres'
    });
  }

  public getInstance(): Sequelize {
    if (!this._sequelize) {
      this._initializeConnection();
    }

    return this._sequelize;
  }
}

export default SequelizeClass;
