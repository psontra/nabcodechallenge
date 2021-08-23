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
        query: {
          name__eq: 'unit test',
          price__gt: 4500000,
          sortBy: 'price:asc',
        },
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
        {
          name__eq: 'unit test',
          price__gt: 4500000,
          sortBy: 'price:asc',
        },
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
        query: {
          name__eq: 'unit test',
          price__gt: 4500000,
          sortBy: 'price:asc',
        },
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

  describe('getProductDetail', () => {
    it('should call service correctly', async () => {
      const request = {
        params: {
          productId: 'unit test',
        },
      };
      const response = mockResponse();
      const next = jest.fn();
      const productServiceMock = {
        getProductById: jest.fn(async () => ({
          id: 'unit test',
          name: 'unit test name',
          price: 123,
          color: null,
          creationDate: new Date(),
          updatedOn: new Date(),
          brandId: 'unit test brand id',
          brand: {
            name: 'unit test brand name',
          },
          categoryId: 'unit test category id',
          category: {
            name: 'unit test category name',
          },
        })),
      };

      container.unbind(Types.IProductService);
      container.bind(Types.IProductService).toConstantValue(productServiceMock);

      const productController = container.get<IProductController>(
        Types.IProductController,
      );

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await productController.getProductDetail(request, response, next);

      expect(response.json).toHaveBeenCalledTimes(1);
      expect(response.json).toHaveBeenCalledWith({
        id: 'unit test',
        name: 'unit test name',
        price: 123,
        color: null,
        creationDate: expect.any(Date),
        updatedOn: expect.any(Date),
        productBrand: {
          id: 'unit test brand id',
          name: 'unit test brand name',
        },
        productCategory: {
          id: 'unit test category id',
          name: 'unit test category name',
        },
      });
      expect(productServiceMock.getProductById).toHaveBeenCalledTimes(1);
      expect(productServiceMock.getProductById).toHaveBeenCalledWith(
        'unit test',
      );
    });

    it('should throw error when catch an exception', async () => {
      const request = {
        params: {
          productId: 'unit-test',
        },
      };
      const response = mockResponse();
      const next = jest.fn();
      const productServiceMock = {
        getProductById: jest.fn(async () => {
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
      await productController.getProductDetail(request, response, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith('unit test error');
    });
  });

  describe('updateProduct', () => {
    it('should call service correctly', async () => {
      const request = {
        params: {
          productId: 'unit test',
        },
        body: {
          name: 'unit test',
        },
      };
      const response = mockResponse();
      const next = jest.fn();
      const productServiceMock = {
        updateById: jest.fn(async () => ({
          id: 'unit test',
          name: 'unit test name',
          price: 123,
          color: null,
          creationDate: new Date(),
          updatedOn: new Date(),
          brandId: 'unit test brand id',
          brand: {
            name: 'unit test brand name',
          },
          categoryId: 'unit test category id',
          category: {
            name: 'unit test category name',
          },
        })),
      };

      container.unbind(Types.IProductService);
      container.bind(Types.IProductService).toConstantValue(productServiceMock);

      const productController = container.get<IProductController>(
        Types.IProductController,
      );

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await productController.updateProduct(request, response, next);

      expect(response.json).toHaveBeenCalledTimes(1);
      expect(response.json).toHaveBeenCalledWith({
        id: 'unit test',
        name: 'unit test name',
        price: 123,
        color: null,
        creationDate: expect.any(Date),
        updatedOn: expect.any(Date),
        productBrand: {
          id: 'unit test brand id',
          name: 'unit test brand name',
        },
        productCategory: {
          id: 'unit test category id',
          name: 'unit test category name',
        },
      });
      expect(productServiceMock.updateById).toHaveBeenCalledTimes(1);
      expect(productServiceMock.updateById).toHaveBeenCalledWith('unit test', {
        name: 'unit test',
      });
    });

    it('should throw error when catch an exception', async () => {
      const request = {
        params: {
          productId: 'unit test',
        },
        body: {
          name: 'unit test',
        },
      };
      const response = mockResponse();
      const next = jest.fn();
      const productServiceMock = {
        updateById: jest.fn(async () => {
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
      await productController.updateProduct(request, response, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith('unit test error');
    });
  });

  describe('deleteProduct', () => {
    it('should call service correctly', async () => {
      const request = {
        params: {
          productId: 'unit test',
        },
      };
      const response = mockResponse();
      const next = jest.fn();
      const productServiceMock = {
        deleteById: jest.fn(async () => ({})),
      };

      container.unbind(Types.IProductService);
      container.bind(Types.IProductService).toConstantValue(productServiceMock);

      const productController = container.get<IProductController>(
        Types.IProductController,
      );

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await productController.deleteProduct(request, response, next);

      expect(response.json).toHaveBeenCalledTimes(1);
      expect(response.json).toHaveBeenCalledWith({ deleteSuccess: true });
      expect(productServiceMock.deleteById).toHaveBeenCalledTimes(1);
      expect(productServiceMock.deleteById).toHaveBeenCalledWith('unit test');
    });

    it('should throw error when catch an exception', async () => {
      const request = {
        params: {
          productId: 'unit-test',
        },
      };
      const response = mockResponse();
      const next = jest.fn();
      const productServiceMock = {
        deleteById: jest.fn(async () => {
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
      await productController.deleteProduct(request, response, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith('unit test error');
    });
  });

  describe('createProduct', () => {
    it('should call service correctly', async () => {
      const request = {
        body: {
          name: 'unit test',
          price: 123,
          brandId: 'unit test brand id',
          categoryId: 'unit test category id',
        },
      };
      const response = mockResponse();
      const next = jest.fn();
      const productServiceMock = {
        createProduct: jest.fn(async () => ({
          id: 'unit test',
          name: 'unit test name',
          price: 123,
          color: null,
          creationDate: new Date(),
          updatedOn: new Date(),
          brandId: 'unit test brand id',
          brand: {
            name: 'unit test brand name',
          },
          categoryId: 'unit test category id',
          category: {
            name: 'unit test category name',
          },
        })),
      };

      container.unbind(Types.IProductService);
      container.bind(Types.IProductService).toConstantValue(productServiceMock);

      const productController = container.get<IProductController>(
        Types.IProductController,
      );

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await productController.createProduct(request, response, next);

      expect(response.json).toHaveBeenCalledTimes(1);
      expect(response.json).toHaveBeenCalledWith({
        id: 'unit test',
        name: 'unit test name',
        price: 123,
        color: null,
        creationDate: expect.any(Date),
        updatedOn: expect.any(Date),
        productBrand: {
          id: 'unit test brand id',
          name: 'unit test brand name',
        },
        productCategory: {
          id: 'unit test category id',
          name: 'unit test category name',
        },
      });
      expect(productServiceMock.createProduct).toHaveBeenCalledTimes(1);
      expect(productServiceMock.createProduct).toHaveBeenCalledWith({
        name: 'unit test',
        price: 123,
        brandId: 'unit test brand id',
        categoryId: 'unit test category id',
      });
    });

    it('should throw error when catch an exception', async () => {
      const request = {
        body: {
          name: 'unit test',
          price: 123,
          brandId: 'unit test brand id',
          categoryId: 'unit test category id',
        },
      };
      const response = mockResponse();
      const next = jest.fn();
      const productServiceMock = {
        createProduct: jest.fn(async () => {
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
      await productController.createProduct(request, response, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith('unit test error');
    });
  });
});
