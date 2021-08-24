import { injectable } from 'inversify';

import { IActivityRepository } from './IActivityRepository';
import { Activity, ActivityCreationAttributes } from '../../models/Activity';

@injectable()
class ActivityRepository implements IActivityRepository {
  public async create(item: ActivityCreationAttributes): Promise<Activity> {
    return await Activity.create(item);
  }

  public async getAll(): Promise<Activity[]> {
    return await Activity.findAll({});
  }
}

export default ActivityRepository;
