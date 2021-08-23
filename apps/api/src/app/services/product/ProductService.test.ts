process.env['NODE_CONFIG_DIR'] = __dirname + '/../../../config/';

import { Op } from 'sequelize';

import container from '../../common/Ioc/InversifyConfig';
import Types from '../../common/Ioc/Types';
import Logger from '../../common/Logger';
import { IProductService } from './IProductService';

describe('product.service', () => {
  beforeEach(() => {
    container.snapshot();
  });

  afterEach(() => {
    jest.clearAllMocks();
    container.restore();
  });

  describe('getProducts', () => {
    it('should call repository and activity service correctly', async () => {
      const filter = [
        {
          name: {
            [Op.eq]: 'unit test',
          },
          price: {
            [Op.gt]: 4500000,
          },
        },
      ];
      const sortBy: [string, string] = ['price', 'ASC'];
      const query = {
        name__eq: 'unit test',
        price__gt: 4500000,
        sortBy: 'price:asc',
      };
      const productRepositoryMock = {
        retrieve: jest.fn(async () => []),
      };
      const activityServiceMock = {
        logActivity: jest.fn(async () => ({})),
      };

      container.unbind(Types.IProductRepository);
      container
        .bind(Types.IProductRepository)
        .toConstantValue(productRepositoryMock);
      container.unbind(Types.IActivityService);
      container
        .bind(Types.IActivityService)
        .toConstantValue(activityServiceMock);

      const productService = container.get<IProductService>(
        Types.IProductService,
      );

      await productService.getProducts(filter, sortBy, query);

      expect(productRepositoryMock.retrieve).toHaveBeenCalledTimes(1);
      expect(productRepositoryMock.retrieve).toHaveBeenCalledWith(
        [
          {
            name: {
              [Op.eq]: 'unit test',
            },
            price: {
              [Op.gt]: 4500000,
            },
          },
        ],
        ['price', 'ASC'],
      );
      expect(activityServiceMock.logActivity).toHaveBeenCalledTimes(1);
      expect(activityServiceMock.logActivity).toHaveBeenCalledWith({
        resourceName: 'products',
        type: 'View list',
        content:
          'View product list with query {"name__eq":"unit test","price__gt":4500000,"sortBy":"price:asc"}',
      });
    });

    it('should catch error when log activity error occurred', async () => {
      const filter = [
        {
          name: {
            [Op.eq]: 'unit test',
          },
          price: {
            [Op.gt]: 4500000,
          },
        },
      ];
      const sortBy: [string, string] = ['price', 'ASC'];
      const query = {
        name__eq: 'unit test',
        price__gt: 4500000,
        sortBy: 'price:asc',
      };
      const productRepositoryMock = {
        retrieve: jest.fn(async () => []),
      };
      const activityServiceMock = {
        logActivity: jest.fn(async () => {
          throw 'unit test error';
        }),
      };
      const loggerError = jest
        .spyOn(Logger, 'error')
        .mockImplementation(() => null);

      container.unbind(Types.IProductRepository);
      container
        .bind(Types.IProductRepository)
        .toConstantValue(productRepositoryMock);
      container.unbind(Types.IActivityService);
      container
        .bind(Types.IActivityService)
        .toConstantValue(activityServiceMock);

      const productService = container.get<IProductService>(
        Types.IProductService,
      );

      const result = await productService.getProducts(filter, sortBy, query);

      expect(result).toEqual([]);
      expect(loggerError).toHaveBeenCalledTimes(1);
      expect(loggerError).toHaveBeenCalledWith(
        'Error logging activity',
        undefined,
      );
    });
  });
});
