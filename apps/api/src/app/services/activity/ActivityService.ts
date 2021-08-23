import axios from 'axios';
import config from 'config';
import { injectable } from 'inversify';

import { IActivityService } from './IActivityService';

export interface Activity {
  id: string;
  resourceId?: number;
  resourceName: string;
  type: string;
  content: string;
  occurred: Date;
}

@injectable()
class ActivityService implements IActivityService {
  private readonly _activityServiceUrl: string;

  constructor() {
    this._activityServiceUrl = `${config.get('activityServiceUrl')}/activities`;
  }

  public async logActivity(activityData: {
    resourceId?: number;
    resourceName: string;
    type: string;
    content: string;
  }): Promise<Activity> {
    return await axios.post(this._activityServiceUrl, activityData);
  }
}

export default ActivityService;
