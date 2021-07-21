const { resolve } = require('path');
const config = require('@redhat-cloud-services/frontend-components-config');
const mutateConfig = require('./mutateConfig');
const mutatePlugins = require('./mutatePlugins');
const { config: webpackConfig, plugins } = config({
  rootFolder: resolve(__dirname, '../'),
  debug: true,
  https: true,
  skipChrome2: true,
  useCloud: true,
  deployment: process.env.BETA ? 'beta/apps' : 'apps',
  ...(process.env.PROXY && {
    useProxy: true,
    appUrl: process.env.BETA
      ? ['/beta/maintenance.html', '/beta/', '/beta/404.html']
      : ['/maintenance.html', '/', '/404.html'],
    exactUrl: true,
  }),
  htmlPlugin: {
    title: 'Home - cloud.redhat.com',
    filename: 'index.html',
    chunks: ['App', 'vendor'],
    template: resolve(__dirname, '../src/index.html'),
  },
});

plugins.push(require('./modules.config'));

module.exports = {
  ...mutateConfig(webpackConfig),
  plugins: mutatePlugins(plugins),
};
