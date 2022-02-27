const netlifyPlugin = require('preact-cli-plugin-netlify');
const tailwind = require('./src/plugins');

module.exports = (config, env, helpers) => {
  config = tailwind(config, env, helpers);
  netlifyPlugin(config, {
    redirects: ['/api/* /.netlify/functions/:splat 200'],
  });
  return config;
};
