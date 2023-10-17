/**
 * Build route with a callback query parameter.
 * @param baseRoute Base route value
 * @param callback Callback parameter value
 * @returns Route with callback query parameter.
 * If the callback does not have a value, it will return only the base route.
 */
export const buildRouteWithCallback = (baseRoute: string, callback: string) => {
  if (!callback) {
    return baseRoute;
  }

  return `${baseRoute}?callbackRoute=${callback}`;
};
