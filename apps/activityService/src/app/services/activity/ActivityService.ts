import { inject, injectable } from 'inversify';

import Types from '../../common/Ioc/Types';
import { Activity, ActivityCreationAttributes } from '../../models/Activity';
import { IActivityService } from './IActivityService';
import { IActivityRepository } from '../../repositories/activity/IActivityRepository';

@injectable()
class ActivityService implements IActivityService {
  constructor(
    @inject(Types.IActivityRepository)
    private _activityRepository: IActivityRepository,
  ) {}

  public async createActivity(
    createActivityData: ActivityCreationAttributes,
  ): Promise<Activity> {
    const activityCreateObj: ActivityCreationAttributes = {
      ...createActivityData,
      occurred: new Date(),
    };

    return await this._activityRepository.create(activityCreateObj);
  }

  public async getActivities(): Promise<Activity[]> {
    return await this._activityRepository.getAll();
  }
}

export default ActivityService;
