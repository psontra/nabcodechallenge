process.env['NODE_CONFIG_DIR'] = __dirname + '/../../../config/';

import container from '../../common/Ioc/InversifyConfig';
import Types from '../../common/Ioc/Types';
import { IActivityController } from './IActivityController';
import { mockResponse } from '../../../__jest__/setup';

describe('activity.controller', () => {
  beforeEach(() => {
    container.snapshot();
  });

  afterEach(() => {
    jest.clearAllMocks();
    container.restore();
  });

  describe('createActivity', () => {
    it('should call service correctly', async () => {
      const request = {
        body: {
          resourceName: 'products',
          type: 'view list products',
          content: '/products?price__gt=4500000',
        },
      };
      const response = mockResponse();
      const next = jest.fn();
      const activityServiceMock = {
        createActivity: jest.fn(async () => ({})),
      };

      container.unbind(Types.IActivityService);
      container
        .bind(Types.IActivityService)
        .toConstantValue(activityServiceMock);

      const productController = container.get<IActivityController>(
        Types.IActivityController,
      );

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await productController.create(request, response, next);

      expect(response.json).toHaveBeenCalledTimes(1);
      expect(response.json).toHaveBeenCalledWith({});
      expect(activityServiceMock.createActivity).toHaveBeenCalledTimes(1);
      expect(activityServiceMock.createActivity).toHaveBeenCalledWith({
        resourceName: 'products',
        type: 'view list products',
        content: '/products?price__gt=4500000',
      });
    });

    it('should throw error when catch an exception', async () => {
      const request = {
        body: {
          resourceName: 'products',
          type: 'view list products',
          content: '/products?price__gt=4500000',
        },
      };
      const response = mockResponse();
      const next = jest.fn();
      const activityServiceMock = {
        createActivity: jest.fn(async () => {
          throw 'unit test error';
        }),
      };

      container.unbind(Types.IActivityService);
      container
        .bind(Types.IActivityService)
        .toConstantValue(activityServiceMock);

      const productController = container.get<IActivityController>(
        Types.IActivityController,
      );

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await productController.create(request, response, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith('unit test error');
    });
  });

  describe('getActivities', () => {
    it('should call service correctly', async () => {
      const request = {};
      const response = mockResponse();
      const next = jest.fn();
      const activityServiceMock = {
        getActivities: jest.fn(async () => []),
      };

      container.unbind(Types.IActivityService);
      container
        .bind(Types.IActivityService)
        .toConstantValue(activityServiceMock);

      const productController = container.get<IActivityController>(
        Types.IActivityController,
      );

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await productController.getActivities(request, response, next);

      expect(response.json).toHaveBeenCalledTimes(1);
      expect(response.json).toHaveBeenCalledWith({
        data: [],
        success: true,
      });
      expect(activityServiceMock.getActivities).toHaveBeenCalledTimes(1);
      expect(activityServiceMock.getActivities).toHaveBeenCalledWith();
    });

    it('should throw error when catch an exception', async () => {
      const request = {};
      const response = mockResponse();
      const next = jest.fn();
      const activityServiceMock = {
        getActivities: jest.fn(async () => {
          throw 'unit test error';
        }),
      };

      container.unbind(Types.IActivityService);
      container
        .bind(Types.IActivityService)
        .toConstantValue(activityServiceMock);

      const productController = container.get<IActivityController>(
        Types.IActivityController,
      );

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await productController.getActivities(request, response, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith('unit test error');
    });
  });
});
