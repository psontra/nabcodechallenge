import { Activity, ActivityCreationAttributes } from '../../models/Activity';

export interface IActivityRepository {
  create(item: ActivityCreationAttributes): Promise<Activity>;
  getAll(): Promise<Activity[]>;
}
