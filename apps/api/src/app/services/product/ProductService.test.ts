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

  describe('getProductById', () => {
    it('should call repository and activity service correctly', async () => {
      const productId = 'unit test';
      const productRepositoryMock = {
        findById: jest.fn(async () => ({})),
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

      await productService.getProductById(productId);

      expect(productRepositoryMock.findById).toHaveBeenCalledTimes(1);
      expect(productRepositoryMock.findById).toHaveBeenCalledWith('unit test');
      expect(activityServiceMock.logActivity).toHaveBeenCalledTimes(1);
      expect(activityServiceMock.logActivity).toHaveBeenCalledWith({
        resourceId: 'unit test',
        resourceName: 'products',
        type: 'View detail',
        content: 'View product unit test detail',
      });
    });

    it('should catch error when log activity error occurred', async () => {
      const productId = 'unit test';
      const productRepositoryMock = {
        findById: jest.fn(async () => ({})),
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

      const result = await productService.getProductById(productId);

      expect(result).toEqual({});
      expect(loggerError).toHaveBeenCalledTimes(1);
      expect(loggerError).toHaveBeenCalledWith(
        'Error logging activity',
        undefined,
      );
    });
  });

  describe('updateById', () => {
    it('should call repository and activity service correctly', async () => {
      const productId = 'unit test';
      const updateObject = {
        name: 'unit test',
      };
      const productRepositoryMock = {
        updateById: jest.fn(async () => ({})),
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

      await productService.updateById(productId, updateObject);

      expect(productRepositoryMock.updateById).toHaveBeenCalledTimes(1);
      expect(productRepositoryMock.updateById).toHaveBeenCalledWith(
        'unit test',
        { name: 'unit test' },
      );
      expect(activityServiceMock.logActivity).toHaveBeenCalledTimes(1);
      expect(activityServiceMock.logActivity).toHaveBeenCalledWith({
        resourceId: 'unit test',
        resourceName: 'products',
        type: 'Update',
        content: 'Update product unit test',
      });
    });

    it('should catch error when log activity error occurred', async () => {
      const productId = 'unit test';
      const updateObject = {
        name: 'unit test',
      };
      const productRepositoryMock = {
        updateById: jest.fn(async () => ({})),
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

      const result = await productService.updateById(productId, updateObject);

      expect(result).toEqual({});
      expect(loggerError).toHaveBeenCalledTimes(1);
      expect(loggerError).toHaveBeenCalledWith(
        'Error logging activity',
        undefined,
      );
    });
  });

  describe('deleteById', () => {
    it('should call repository and activity service correctly', async () => {
      const productId = 'unit test';
      const productRepositoryMock = {
        deleteById: jest.fn(async () => ({})),
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

      await productService.deleteById(productId);

      expect(productRepositoryMock.deleteById).toHaveBeenCalledTimes(1);
      expect(productRepositoryMock.deleteById).toHaveBeenCalledWith(
        'unit test',
      );
      expect(activityServiceMock.logActivity).toHaveBeenCalledTimes(1);
      expect(activityServiceMock.logActivity).toHaveBeenCalledWith({
        resourceId: 'unit test',
        resourceName: 'products',
        type: 'Delete',
        content: 'Delete product unit test',
      });
    });

    it('should catch error when log activity error occurred', async () => {
      const productId = 'unit test';
      const productRepositoryMock = {
        deleteById: jest.fn(async () => ({})),
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

      await productService.deleteById(productId);

      expect(loggerError).toHaveBeenCalledTimes(1);
      expect(loggerError).toHaveBeenCalledWith(
        'Error logging activity',
        undefined,
      );
    });
  });

  describe('createProduct', () => {
    it('should call repository and activity service correctly', async () => {
      const createObject = {
        name: 'unit test',
        price: 123,
        brandId: 'unit test brand id',
        categoryId: 'unit test category id',
      };
      const productRepositoryMock = {
        create: jest.fn(async () => ({
          id: 'unit test',
        })),
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

      await productService.createProduct(createObject);

      expect(productRepositoryMock.create).toHaveBeenCalledTimes(1);
      expect(productRepositoryMock.create).toHaveBeenCalledWith({
        name: 'unit test',
        price: 123,
        brandId: 'unit test brand id',
        categoryId: 'unit test category id',
      });
      expect(activityServiceMock.logActivity).toHaveBeenCalledTimes(1);
      expect(activityServiceMock.logActivity).toHaveBeenCalledWith({
        resourceId: 'unit test',
        resourceName: 'products',
        type: 'Create',
        content: 'Create product unit test',
      });
    });

    it('should catch error when log activity error occurred', async () => {
      const createObject = {
        name: 'unit test',
        price: 123,
        brandId: 'unit test brand id',
        categoryId: 'unit test category id',
      };
      const productRepositoryMock = {
        create: jest.fn(async () => ({
          id: 'unit test',
        })),
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

      const result = await productService.createProduct(createObject);

      expect(result).toEqual({
        id: 'unit test',
      });
      expect(loggerError).toHaveBeenCalledTimes(1);
      expect(loggerError).toHaveBeenCalledWith(
        'Error logging activity',
        undefined,
      );
    });
  });
});
