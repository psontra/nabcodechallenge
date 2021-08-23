process.env['NODE_CONFIG_DIR'] = __dirname + '/../../../config/';

import { Op } from 'sequelize';

import container from '../../common/Ioc/InversifyConfig';
import Types from '../../common/Ioc/Types';
import { IProductController } from './IProductController';
import { mockResponse } from '../../../__jest__/setup';

describe('product.controller', () => {
  beforeEach(() => {
    container.snapshot();
  });

  afterEach(() => {
    jest.clearAllMocks();
    container.restore();
  });

  describe('getProducts', () => {
    it('should call service correctly', async () => {
      const request = {
        filter: [
          {
            name: {
              [Op.eq]: 'unit test',
            },
            price: {
              [Op.gt]: 4500000,
            },
          },
        ],
        sortBy: ['price', 'ASC'],
      };
      const response = mockResponse();
      const next = jest.fn();
      const productServiceMock = {
        getProducts: jest.fn(async () => []),
      };

      container.unbind(Types.IProductService);
      container.bind(Types.IProductService).toConstantValue(productServiceMock);

      const productController = container.get<IProductController>(
        Types.IProductController,
      );

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await productController.getProducts(request, response, next);

      expect(response.json).toHaveBeenCalledTimes(1);
      expect(response.json).toHaveBeenCalledWith([]);
      expect(productServiceMock.getProducts).toHaveBeenCalledTimes(1);
      expect(productServiceMock.getProducts).toHaveBeenCalledWith(
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
    });

    it('should throw error when catch an exception', async () => {
      const request = {
        filter: [
          {
            name: {
              [Op.eq]: 'unit test',
            },
            price: {
              [Op.gt]: 4500000,
            },
          },
        ],
        sortBy: ['price', 'ASC'],
      };
      const response = mockResponse();
      const next = jest.fn();
      const productServiceMock = {
        getProducts: jest.fn(async () => {
          throw 'unit test error';
        }),
      };

      container.unbind(Types.IProductService);
      container.bind(Types.IProductService).toConstantValue(productServiceMock);

      const productController = container.get<IProductController>(
        Types.IProductController,
      );

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await productController.getProducts(request, response, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith('unit test error');
    });
  });
});
