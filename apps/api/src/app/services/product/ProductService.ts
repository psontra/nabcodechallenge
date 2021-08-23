import { inject, injectable } from 'inversify';
import { get } from 'lodash';

import { IProductRepository } from '../../repositories/product/IProductRepository';
import Types from '../../common/Ioc/Types';
import { IProductService } from './IProductService';
import { Product, ProductCreationAttributes } from '../../models/Product';
import { IActivityService } from '../activity/IActivityService';
import {
  ActivityContent,
  ActivityResources,
  ActivityTypes,
} from '../../common/Enum';
import Logger from '../../common/Logger';

@injectable()
class ProductService implements IProductService {
  constructor(
    @inject(Types.IProductRepository)
    private _productRepository: IProductRepository,
    @inject(Types.IActivityService)
    private _activityService: IActivityService,
  ) {}

  public async getProducts(
    filter: Record<string, unknown>[],
    sortBy?: [string, string],
    reqQuery?: Record<string, unknown>,
  ): Promise<Product[]> {
    const products = await this._productRepository.retrieve(filter, sortBy);

    // not waiting for response, only log error to track
    this._activityService
      .logActivity({
        resourceName: ActivityResources.product,
        type: ActivityTypes.getList,
        content: ActivityContent.getProductList.replace(
          '{{query}}',
          JSON.stringify(reqQuery),
        ),
      })
      .catch((err) => {
        Logger.error('Error logging activity', get(err, 'response.data'));
      });

    return products;
  }

  public async getProductById(productId: string): Promise<Product> {
    const product = await this._productRepository.findById(productId);

    // not waiting for response, only log error to track
    this._activityService
      .logActivity({
        resourceId: productId,
        resourceName: ActivityResources.product,
        type: ActivityTypes.getDetail,
        content: ActivityContent.getProductDetail.replace(
          '{{productId}}',
          productId,
        ),
      })
      .catch((err) => {
        Logger.error('Error logging activity', get(err, 'response.data'));
      });

    return product;
  }

  public async updateById(
    productId: string,
    updateObject: Partial<ProductCreationAttributes>,
  ): Promise<Product> {
    const product = await this._productRepository.updateById(
      productId,
      updateObject,
    );

    // not waiting for response, only log error to track
    this._activityService
      .logActivity({
        resourceId: productId,
        resourceName: ActivityResources.product,
        type: ActivityTypes.update,
        content: ActivityContent.updateProduct.replace(
          '{{productId}}',
          productId,
        ),
      })
      .catch((err) => {
        Logger.error('Error logging activity', get(err, 'response.data'));
      });

    return product;
  }

  public async deleteById(productId: string): Promise<void> {
    await this._productRepository.deleteById(productId);

    // not waiting for response, only log error to track
    this._activityService
      .logActivity({
        resourceId: productId,
        resourceName: ActivityResources.product,
        type: ActivityTypes.delete,
        content: ActivityContent.deleteProduct.replace(
          '{{productId}}',
          productId,
        ),
      })
      .catch((err) => {
        Logger.error('Error logging activity', get(err, 'response.data'));
      });

    return;
  }

  public async createProduct(
    createProductData: ProductCreationAttributes,
  ): Promise<Product> {
    const product = await this._productRepository.create(createProductData);

    // not waiting for response, only log error to track
    this._activityService
      .logActivity({
        resourceId: product.id,
        resourceName: ActivityResources.product,
        type: ActivityTypes.create,
        content: ActivityContent.createProduct.replace(
          '{{productId}}',
          product.id,
        ),
      })
      .catch((err) => {
        Logger.error('Error logging activity', get(err, 'response.data'));
      });

    return product;
  }
}

export default ProductService;
