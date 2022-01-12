const tailwind = require('./src/plugins');

module.exports = (config, env, helpers) => {
  config = tailwind(config, env, helpers);
  return config;
};