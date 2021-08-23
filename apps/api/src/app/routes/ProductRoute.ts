import { Router } from 'express';
import { inject, injectable } from 'inversify';
import { createValidator } from 'express-joi-validation';

import Types from '../common/Ioc/Types';
import { IProductController } from '../controllers/product/IProductController';
import parseQuery from '../common/ParseQuery';
import {
  createProductValidator,
  updateProductValidator,
} from '../validators/ProductValidator';

const validator = createValidator({ passError: true });

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
    this._router
      .route('/')
      .get(
        parseQuery,
        this._productController.getProducts.bind(this._productController),
      )
      .post(
        validator.body(createProductValidator),
        this._productController.createProduct.bind(this._productController),
      );

    this._router
      .route('/:productId')
      .get(
        this._productController.getProductDetail.bind(this._productController),
      )
      .put(
        validator.body(updateProductValidator),
        this._productController.updateProduct.bind(this._productController),
      )
      .delete(
        this._productController.deleteProduct.bind(this._productController),
      );
  }

  get routes(): Router {
    return this._router;
  }
}

export default ProductRoute;
