import { inject, injectable } from 'inversify';
import { NextFunction, Response } from 'express';
import { ValidatedRequest } from 'express-joi-validation';

import { CreateActivityRequestSchema } from '../../validators/ActivityValidator';
import { IActivityController } from './IActivityController';
import Types from '../../common/Ioc/Types';
import { IActivityService } from '../../services/activity/IActivityService';
import Logger from '../../common/Logger';
import {
  transformCreatedActivity,
  TransformedActivity,
} from '../../transformers/ActivityTransformer';
import { ExpressCustomRequest } from '../../common/ExpressCustomTypes';

@injectable()
class ActivityController implements IActivityController {
  constructor(
    @inject(Types.IActivityService) private _activityService: IActivityService,
  ) {}

  public async create(
    req: ValidatedRequest<CreateActivityRequestSchema>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const activity = await this._activityService.createActivity(req.body);
      const transformedActivity: TransformedActivity =
        transformCreatedActivity(activity);

      res.json(transformedActivity);
    } catch (err) {
      Logger.error('Error creating activity', err);

      return next(err);
    }
  }

  public async getActivities(
    req: ExpressCustomRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const activities = await this._activityService.getActivities();
      const transformedActivities: TransformedActivity[] = activities.map(
        transformCreatedActivity,
      );

      res.json({
        data: transformedActivities,
        success: true,
      });
    } catch (err) {
      Logger.error('Error getting activity list ', err);

      return next(err);
    }
  }
}

export default ActivityController;
