import { Activity } from './ActivityService';

export interface IActivityService {
  logActivity(activityData: {
    resourceId?: string;
    resourceName: string;
    type: string;
    content: string;
  }): Promise<Activity>;
}
