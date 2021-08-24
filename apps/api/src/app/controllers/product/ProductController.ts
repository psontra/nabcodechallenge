import { inject, injectable } from 'inversify';
import { NextFunction, Response, Request } from 'express';
import { ValidatedRequest } from 'express-joi-validation';

import { IProductController } from './IProductController';
import Types from '../../common/Ioc/Types';
import { IProductService } from '../../services/product/IProductService';
import Logger from '../../common/Logger';
import {
  transformProduct,
  TransformedProduct,
} from '../../transformers/ProductTransformer';
import { ExpressCustomRequest } from '../../common/ExpressCustomTypes';
import {
  CreateProductRequestSchema,
  UpdateProductRequestSchema,
} from '../../validators/ProductValidator';

/**
 * @swagger
 * responses:
 *  Product:
 *    type: object
 *    description: Product detail
 *    properties:
 *      id:
 *        type: string
 *        example: edcf6c53-728f-4fa9-ab52-669a30cda0fb
 *      name:
 *        type: string
 *        example: Gigabyte GeForce RTX™ 3090 FTW3 ULTRA GAMING – 24GB GDDR6X
 *      price:
 *        type: integer
 *        example: 60990000
 *      color:
 *        type: string
 *        example: black
 *        allowEmpty: true
 *      productBrand:
 *        $ref: '#/responses/ProductBrand'
 *      productCategory:
 *        $ref: '#/responses/ProductCategory'
 *      creationDate:
 *        type: date
 *        example: 2021-08-22T08:34:10.073Z
 *      updatedOn:
 *        type: date
 *        example: 2021-08-22T08:34:10.073Z
 *
 *  ProductBrand:
 *    type: object
 *    description: Product's brand
 *    properties:
 *      id:
 *        type: string
 *        example: 249176ea-24d8-40e5-a729-fab46430986c
 *      name:
 *        type: string
 *        example: Gigabyte
 *
 *  ProductCategory:
 *    type: object
 *    description: Product's category
 *    properties:
 *      id:
 *        type: string
 *        example: aa4ef1f7-7956-43cd-9b28-cf921e249c51
 *      name:
 *        type: string
 *        example: VGA - Card Đồ Họa
 *  InternalError:
 *    description: Internal Server Error
 *    content:
 *      application/json:
 *        schema:
 *          properties:
 *            success:
 *              type: boolean
 *              example: false
 *  NotFoundError:
 *    description: Not found entity
 *    content:
 *      application/json:
 *        schema:
 *          properties:
 *            success:
 *              type: boolean
 *              example: false
 *            error:
 *              type: string
 */

@injectable()
class ProductController implements IProductController {
  constructor(
    @inject(Types.IProductService) private _productService: IProductService,
  ) {}

  /**
   * @swagger
   * /products:
   *   get:
   *     summary: List of products
   *     description: Get list of products
   *     produces:
   *       application/json
   *     parameters:
   *       - in: query
   *         name: name
   *         schema:
   *           type: string
   *         description: Name of product
   *       - in: query
   *         name: price
   *         schema:
   *           type: integer
   *         description: Price of product
   *       - in: query
   *         name: color
   *         schema:
   *           type: string
   *         description: Color of product
   *       - in: query
   *         name: brandId
   *         schema:
   *           type: string
   *         description: Brand id of product
   *       - in: query
   *         name: categoryId
   *         schema:
   *           type: string
   *         description: Category id of product
   *       - in: query
   *         name: sortBy
   *         schema:
   *           type: string
   *         description: Sort order of list products
   *         example: updatedOn:desc
   *     responses:
   *       200:
   *         description: List of products
   *         content:
   *           application/json:
   *             schema:
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   type: array
   *                   items:
   *                     $ref: '#/responses/Product'
   *       500:
   *         $ref: '#/responses/InternalError'
   */
  public async getProducts(
    req: ExpressCustomRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const products = await this._productService.getProducts(
        req.filter,
        req.sortBy,
        req.query,
      );
      const transformedProducts: TransformedProduct[] =
        products.map(transformProduct);

      res.json({
        data: transformedProducts,
        success: true,
      });
    } catch (err) {
      Logger.error('Error getting product list ', err);

      return next(err);
    }
  }

  /**
   * @swagger
   * /products/{productId}:
   *   get:
   *     summary: Product detail
   *     description: Get product detail
   *     produces:
   *       application/json
   *     parameters:
   *       - in: path
   *         name: productId
   *         schema:
   *           type: string
   *         description: Id of product
   *         default: edcf6c53-728f-4fa9-ab52-669a30cda0fb
   *     responses:
   *       200:
   *         description: Product detail
   *         content:
   *           application/json:
   *             schema:
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   $ref: '#/responses/Product'
   *       500:
   *         $ref: '#/responses/InternalError'
   *       404:
   *         $ref: '#/responses/NotFoundError'
   */
  public async getProductDetail(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const product = await this._productService.getProductById(
        req.params.productId,
      );
      const transformedProduct: TransformedProduct = transformProduct(product);

      res.json({
        data: transformedProduct,
        success: true,
      });
    } catch (err) {
      Logger.error('Error getting product detail ', err);

      return next(err);
    }
  }

  /**
   * @swagger
   * /products/{productId}:
   *   put:
   *     summary: Update product
   *     description: Update product
   *     produces:
   *       application/json
   *     parameters:
   *       - in: path
   *         name: productId
   *         schema:
   *           type: string
   *         description: Id of product
   *         default: edcf6c53-728f-4fa9-ab52-669a30cda0fb
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             properties:
   *               name:
   *                 type: string
   *                 example: new product
   *               price:
   *                 type: integer
   *                 example: 123
   *               color:
   *                 type: string
   *                 example: another color
   *     responses:
   *       200:
   *         description: Updated product
   *         content:
   *           application/json:
   *             schema:
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   $ref: '#/responses/Product'
   *       500:
   *         $ref: '#/responses/InternalError'
   *       404:
   *         $ref: '#/responses/NotFoundError'
   */
  public async updateProduct(
    req: ValidatedRequest<UpdateProductRequestSchema>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const product = await this._productService.updateById(
        req.params.productId,
        req.body,
      );
      const transformedProduct: TransformedProduct = transformProduct(product);

      res.json({
        data: transformedProduct,
        success: true,
      });
    } catch (err) {
      Logger.error('Error updating product ', err);

      return next(err);
    }
  }

  /**
   * @swagger
   * /products/{productId}:
   *   delete:
   *     summary: Soft delete product
   *     description: Soft delete product
   *     produces:
   *       application/json
   *     parameters:
   *       - in: path
   *         name: productId
   *         schema:
   *           type: string
   *         description: Id of product
   *         default: edcf6c53-728f-4fa9-ab52-669a30cda0fb
   *     responses:
   *       200:
   *         description: Success response (even if product id does not exist)
   *         content:
   *           application/json:
   *             schema:
   *               properties:
   *                 success:
   *                   type: boolean
   *       500:
   *         $ref: '#/responses/InternalError'
   */
  public async deleteProduct(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      await this._productService.deleteById(req.params.productId);

      res.json({
        success: true,
      });
    } catch (err) {
      Logger.error('Error deleting product ', err);

      return next(err);
    }
  }

  /**
   * @swagger
   * /products:
   *   post:
   *     summary: Create product
   *     description: Create product
   *     produces:
   *       application/json
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             properties:
   *               name:
   *                 type: string
   *                 example: create new product
   *               price:
   *                 type: integer
   *                 example: 123456
   *               color:
   *                 type: string
   *                 example: new another color
   *               brandId:
   *                 type: string
   *                 example: 249176ea-24d8-40e5-a729-fab46430986c
   *               categoryId:
   *                 type: string
   *                 example: aa4ef1f7-7956-43cd-9b28-cf921e249c51
   *     responses:
   *       200:
   *         description: Created product
   *         content:
   *           application/json:
   *             schema:
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   $ref: '#/responses/Product'
   *       500:
   *         $ref: '#/responses/InternalError'
   */
  public async createProduct(
    req: ValidatedRequest<CreateProductRequestSchema>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const product = await this._productService.createProduct(req.body);
      const transformedProduct: TransformedProduct = transformProduct(product);

      res.json({
        data: transformedProduct,
        success: true,
      });
    } catch (err) {
      Logger.error('Error creating product ', err);

      return next(err);
    }
  }
}

export default ProductController;
