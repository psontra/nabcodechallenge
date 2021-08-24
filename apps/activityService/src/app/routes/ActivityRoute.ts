import { Router } from 'express';
import { createValidator } from 'express-joi-validation';
import { inject, injectable } from 'inversify';

import Types from '../common/Ioc/Types';
import { IActivityController } from '../controllers/activity/IActivityController';
import { createActivityValidator } from '../validators/ActivityValidator';

const validator = createValidator({ passError: true });

@injectable()
class ActivityRoute {
  private readonly _router: Router;

  constructor(
    @inject(Types.IActivityController)
    private _activityController: IActivityController,
  ) {
    this._router = Router();
    this.registerActivityRoutes();
  }

  private registerActivityRoutes() {
    this._router
      .route('/')
      .get(
        this._activityController.getActivities.bind(this._activityController),
      )
      .post(
        validator.body(createActivityValidator),
        this._activityController.create.bind(this._activityController),
      );
  }

  get routes(): Router {
    return this._router;
  }
}

export default ActivityRoute;
