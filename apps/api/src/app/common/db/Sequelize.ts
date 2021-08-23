import { Sequelize } from 'sequelize-typescript';
import config from 'config';

import Brand from '../../models/Brand';
import Category from '../../models/Category';
import { Product } from '../../models/Product';

class SequelizeWrapper {
  public static initializeConnection() {
    const dbConfig: {
      user: string;
      password: string;
      host: string;
      name: string;
      logging: boolean;
    } = config.get('dbConfig');
    const username = dbConfig.user || 'postgres';
    const password = dbConfig.password || '123';
    const dbName = dbConfig.name || 'iCommerce';
    const host = dbConfig.host || '127.0.0.1';

    const sequelize: Sequelize = new Sequelize(dbName, username, password, {
      host,
      dialect: 'postgres',
      logging: dbConfig.logging,
    });

    sequelize.addModels([Brand, Category, Product]);

    return sequelize;
  }
}

export default SequelizeWrapper.initializeConnection();
