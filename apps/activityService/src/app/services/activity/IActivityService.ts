import { Activity, ActivityCreationAttributes } from '../../models/Activity';

export interface IActivityService {
  createActivity(body: ActivityCreationAttributes): Promise<Activity>;
}
