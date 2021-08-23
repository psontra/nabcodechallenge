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
    body: ActivityCreationAttributes,
  ): Promise<Activity> {
    const activityCreateObj: ActivityCreationAttributes = {
      resourceId: body.resourceId,
      resourceName: body.resourceName,
      type: body.type,
      content: body.content,
      occurred: new Date(),
    };

    return await this._activityRepository.create(activityCreateObj);
  }
}

export default ActivityService;
