import { inject, injectable } from 'inversify';

import { IProductRepository } from '../../repositories/product/IProductRepository';
import Types from '../../common/Ioc/Types';
import { IProductService } from './IProductService';
import Product from '../../models/Product';

@injectable()
class ProductService implements IProductService {
  constructor(
    @inject(Types.IProductRepository)
    private _productRepository: IProductRepository,
  ) {}

  public async getProducts(
    filter: Record<string, unknown>,
  ): Promise<Product[]> {
    return await this._productRepository.retrieve(filter);
  }
}

export default ProductService;
