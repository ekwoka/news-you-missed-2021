const netlifyPlugin = require('preact-cli-plugin-netlify');
const tailwind = require('./src/plugins');

module.exports = (config, env, helpers) => {
  config = tailwind(config, env, helpers);
  netlifyPlugin(config);
  return config;
};
