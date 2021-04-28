const Moment = require('moment')();
const koa_logger = require('koa-logger');

exports.logger = function () {
  return koa_logger((str) => {
    process.stdout.write(`${Moment.format('YYYY-MM-DD HH:mm:ss')}${str}`);
  });
};
