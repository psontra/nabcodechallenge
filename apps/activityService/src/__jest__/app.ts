import 'reflect-metadata';

process.env['NODE_CONFIG_DIR'] = __dirname + '/../config/';
import express from 'express';
import bodyParser from 'body-parser';

import { ErrorHandler } from '../app/common/ErrorHandler';
import Types from '../app/common/Ioc/Types';
import container from '../app/common/Ioc/InversifyConfig';
import Routes from '../routes';

const routes: Routes = container.get(Types.Routes);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes.router);
app.use(ErrorHandler);

export default app;
