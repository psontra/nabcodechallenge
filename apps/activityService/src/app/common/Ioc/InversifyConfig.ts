import { Container } from 'inversify';

import Types from './Types';

import ActivityRepository from '../../repositories/activity/ActivityRepository';
import { IActivityRepository } from '../../repositories/activity/IActivityRepository';

import { IActivityService } from '../../services/activity/IActivityService';
import ActivityService from '../../services/activity/ActivityService';

import { IActivityController } from '../../controllers/activity/IActivityController';
import ActivityController from '../../controllers/activity/ActivityController';

import ActivityRoute from '../../routes/ActivityRoute';
import Routes from '../../../routes';

class InversifyConfig {
  static init(): Container {
    const container = new Container();

    container
      .bind<IActivityRepository>(Types.IActivityRepository)
      .to(ActivityRepository);

    container
      .bind<IActivityService>(Types.IActivityService)
      .to(ActivityService);

    container
      .bind<IActivityController>(Types.IActivityController)
      .to(ActivityController);

    container.bind<ActivityRoute>(Types.ActivityRoute).to(ActivityRoute);
    container.bind<Routes>(Types.Routes).to(Routes);

    return container;
  }
}

export default InversifyConfig.init();
