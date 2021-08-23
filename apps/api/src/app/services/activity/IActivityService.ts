import { Activity } from './ActivityService';

export interface IActivityService {
  logActivity(activityData: {
    resourceId?: number;
    resourceName: string;
    type: string;
    content: string;
  }): Promise<Activity>;
}
