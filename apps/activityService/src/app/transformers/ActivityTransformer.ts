import { Activity } from '../models/Activity';

type TransformedActivity = Pick<
  Activity,
  'id' | 'resourceId' | 'resourceName' | 'type' | 'content' | 'occurred'
>;

const transformCreatedActivity = (
  activityData: Activity,
): TransformedActivity => {
  return {
    id: activityData.id,
    resourceId: activityData.resourceId,
    resourceName: activityData.resourceName,
    type: activityData.type,
    content: activityData.content,
    occurred: activityData.occurred,
  };
};

export { transformCreatedActivity, TransformedActivity };
