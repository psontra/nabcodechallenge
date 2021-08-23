import { inject, injectable } from 'inversify';
import { Router } from 'express';

import Types from './app/common/Ioc/Types';
import ActivityRoute from './app/routes/ActivityRoute';

@injectable()
class Routes {
  private readonly _router: Router;

  constructor(
    @inject(Types.ActivityRoute) private _activityRoute: ActivityRoute,
  ) {
    this._router = Router();
    this._registerRoutes();
  }

  private _registerRoutes(): Router {
    this._router.use('/activities', this._activityRoute.routes);

    return this._router;
  }

  get router(): Router {
    return this._router;
  }
}

export default Routes;
