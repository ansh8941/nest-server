import { environment } from '@common/environment';

//---------------------------------------------------------
/**
 * Custom graphql factory
 *
 */
export const graphqlModuleFactory = async () => {
  const graphqlEnvironmentOptions = environment().graphql;
  // const logger = new Logger();
  return {
    ...graphqlEnvironmentOptions,
    context: ({ req, connection }) => {
      if (!connection) {
        // Http request
        return {
          token: undefined as string | undefined,
          req: req as Request,
        };
      } else {
        // USE THIS TO PROVIDE THE RIGHT CONTEXT FOR I18N
        return {
          token: undefined as string | undefined,
          req: connection.context as Request,
        };
      }
    },

    formatError: (error: any) => {
      console.log('klg-31', error);

      const graphQLFormattedError = {
        message: error.extensions?.response?.message || error?.message,
        code: error.extensions?.code || 'SERVER_ERROR',
        name: error.extensions?.name || error.name,
        statusCode:
          error?.extensions?.response?.statusCode ||
          error?.extensions?.statusCode ||
          500,
      };
      return graphQLFormattedError;
    },
  };
};
