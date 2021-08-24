import { Activity, ActivityCreationAttributes } from '../../models/Activity';

export interface IActivityService {
  createActivity(
    createActivityData: ActivityCreationAttributes,
  ): Promise<Activity>;
  getActivities(): Promise<Activity[]>;
}
