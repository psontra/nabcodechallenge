process.env['NODE_CONFIG_DIR'] = __dirname + '/../../../config/';

import container from '../../common/Ioc/InversifyConfig';
import Types from '../../common/Ioc/Types';
import { IActivityService } from './IActivityService';

describe('activity.service', () => {
  beforeEach(() => {
    container.snapshot();
  });

  afterEach(() => {
    jest.clearAllMocks();
    container.restore();
  });

  describe('createActivity', () => {
    it('should call repository correctly', async () => {
      const body = {
        resourceName: 'products',
        type: 'view list products',
        content: '/products?price__gt=4500000',
      };
      const activityRepositoryMock = {
        create: jest.fn(async () => ({})),
      };

      container.unbind(Types.IActivityRepository);
      container
        .bind(Types.IActivityRepository)
        .toConstantValue(activityRepositoryMock);

      const activityService = container.get<IActivityService>(
        Types.IActivityService,
      );

      await activityService.createActivity(body);

      expect(activityRepositoryMock.create).toHaveBeenCalledTimes(1);
      expect(activityRepositoryMock.create).toHaveBeenCalledWith({
        resourceName: 'products',
        type: 'view list products',
        content: '/products?price__gt=4500000',
        occurred: expect.any(Date),
      });
    });
  });

  describe('getActivities', () => {
    it('should call repository correctly', async () => {
      const activityRepositoryMock = {
        getAll: jest.fn(async () => []),
      };

      container.unbind(Types.IActivityRepository);
      container
        .bind(Types.IActivityRepository)
        .toConstantValue(activityRepositoryMock);

      const activityService = container.get<IActivityService>(
        Types.IActivityService,
      );

      await activityService.getActivities();

      expect(activityRepositoryMock.getAll).toHaveBeenCalledTimes(1);
      expect(activityRepositoryMock.getAll).toHaveBeenCalledWith();
    });
  });
});
