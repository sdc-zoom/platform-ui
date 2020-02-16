const config = require(`./build/config.${process.env.NODE_ENV}`);

module.exports = {
  ...config
};
