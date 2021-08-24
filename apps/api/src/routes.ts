import { inject, injectable } from 'inversify';
import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const pkg = require('../package.json');

const swaggerDocument = swaggerJSDoc({
  definition: {
    openapi: '3.0.2',
    info: {
      title: pkg.name,
      version: pkg.version,
      description: pkg.description,
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/app/controllers/**/*.ts'],
});

import Types from './app/common/Ioc/Types';
import ProductRoute from './app/routes/ProductRoute';

@injectable()
class Routes {
  private readonly _router: Router;

  constructor(@inject(Types.ProductRoute) private _productRoute: ProductRoute) {
    this._router = Router();
    this._registerRoutes();
  }

  private _registerRoutes(): Router {
    this._router.use('/products', this._productRoute.routes);

    this._router.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument),
    );

    return this._router;
  }

  get router(): Router {
    return this._router;
  }
}

export default Routes;
