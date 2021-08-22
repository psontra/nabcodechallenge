import { Router } from 'express';
import { inject, injectable } from 'inversify';

import Types from '../common/Ioc/Types';
import { IProductController } from '../controllers/product/IProductController';
import parseQuery from '../common/ParseQuery';

@injectable()
class ProductRoute {
  private readonly _router: Router;

  constructor(
    @inject(Types.IProductController)
    private _productController: IProductController,
  ) {
    this._router = Router();
    this.registerProductRoutes();
  }

  private registerProductRoutes() {
    this._router.get(
      '/',
      parseQuery,
      this._productController.getProducts.bind(this._productController),
    );
  }

  get routes(): Router {
    return this._router;
  }
}

export default ProductRoute;
