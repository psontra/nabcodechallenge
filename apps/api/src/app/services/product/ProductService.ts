import { inject, injectable } from 'inversify';
import { get } from 'lodash';

import { IProductRepository } from '../../repositories/product/IProductRepository';
import Types from '../../common/Ioc/Types';
import { IProductService } from './IProductService';
import Product from '../../models/Product';
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
}

export default ProductService;
