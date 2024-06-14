
import type { WebpackConfigMutator } from '@teambit/webpack';
import * as webpack from 'webpack';

/**
 * modifies the webpack config for the components preview bundle.
 * @see https://bit.dev/reference/webpack/webpack-config
 */
export const webpackTransformer = (
  config: WebpackConfigMutator,
): WebpackConfigMutator => {

  if (process.env.NODE_ENV !== 'production') {
    const filteredEnv = Object.keys(process.env).reduce((acc: any, key: string) => {
      if (
        process.env.PROJECT_NAMESPACE?.split(',').some((prefix) => {
          return key.startsWith(prefix);
        })
      ) {
        acc[key] = process.env[key];
      }
      return acc;
    }, {});
    config.addPlugin(
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(filteredEnv),
      })
    );
  } else {
    // TODO: Find safe way of injecting env vars into production build
  }
  return config;

};