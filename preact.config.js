const netlifyPlugin = require('preact-cli-plugin-netlify');
const tailwind = require('./src/plugins');

module.exports = (config, env, helpers) => {
  netlifyPlugin(config);
  config = tailwind(config, env, helpers);
  return config;
};