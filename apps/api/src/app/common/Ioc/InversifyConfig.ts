import { Container } from 'inversify';

import Types from './Types';

import { ILogger } from '../logger/ILogger';
import Logger from '../logger/Logger';
import { ISequelize } from '../db/ISequelize';
import SequelizeClass from '../db/Sequelize';

const container = new Container();

container.bind<ILogger>(Types.ILogger).to(Logger);
container.bind<ISequelize>(Types.ISequelize).to(SequelizeClass);

export default container;
