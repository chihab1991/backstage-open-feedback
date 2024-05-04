import {
  coreServices,
  createBackendPlugin,
} from '@backstage/backend-plugin-api';
import { createRouter } from './service/router';

/**
 * openFeedbackPlugin backend plugin
 *
 * @public
 */
export const openFeedbackPlugin = createBackendPlugin({
  pluginId: 'open-feedback',
  register(env) {
    env.registerInit({
      deps: {
        discovery: coreServices.discovery,
        database: coreServices.database,
        logger: coreServices.logger,
        httpRouter: coreServices.httpRouter,
        auth: coreServices.auth,
        httpAuth: coreServices.httpAuth,
      },
      async init({ database, discovery, logger, httpRouter, auth, httpAuth }) {
        httpRouter.use(
          await createRouter({
            database,
            discovery,
            logger,
            auth,
            httpAuth,
          }),
        );
      },
    });
  },
});
