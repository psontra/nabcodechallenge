import { Container } from 'inversify';

import Types from './Types';

import ProductRepository from '../../repositories/product/ProductRepository';
import { IProductRepository } from '../../repositories/product/IProductRepository';

import { IProductService } from '../../services/product/IProductService';
import ProductService from '../../services/product/ProductService';

import { IProductController } from '../../controllers/product/IProductController';
import ProductController from '../../controllers/product/ProductController';

import ProductRoute from '../../routes/ProductRoute';
import Routes from '../../../routes';

class InversifyConfig {
  static init(): Container {
    const container = new Container();

    container
      .bind<IProductRepository>(Types.IProductRepository)
      .to(ProductRepository);

    container.bind<IProductService>(Types.IProductService).to(ProductService);

    container
      .bind<IProductController>(Types.IProductController)
      .to(ProductController);

    container.bind<ProductRoute>(Types.ProductRoute).to(ProductRoute);
    container.bind<Routes>(Types.Routes).to(Routes);

    return container;
  }
}

export default InversifyConfig.init();
