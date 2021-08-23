process.env['NODE_CONFIG_DIR'] = __dirname + '/../../../config/';

import axios from 'axios';

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

  describe('logActivity', () => {
    it('should call to activity service correctly', async () => {
      const activityData = {
        resourceName: 'products',
        type: 'View list',
        content:
          'View product list with query {"name__eq":"unit test","price__gt":4500000,"sortBy":"price:asc"}',
      };
      const axiosPost = jest.spyOn(axios, 'post').mockResolvedValue({});

      const activityService = container.get<IActivityService>(
        Types.IActivityService,
      );

      await activityService.logActivity(activityData);

      expect(axiosPost).toHaveBeenCalledTimes(1);
      expect(axiosPost).toHaveBeenCalledWith(
        'http://activity-service:3001/activities',
        {
          resourceName: 'products',
          type: 'View list',
          content:
            'View product list with query {"name__eq":"unit test","price__gt":4500000,"sortBy":"price:asc"}',
        },
      );
    });
  });
});
