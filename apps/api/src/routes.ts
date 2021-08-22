import { inject, injectable } from 'inversify';
import { Router } from 'express';

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

    return this._router;
  }

  get router(): Router {
    return this._router;
  }
}

export default Routes;
