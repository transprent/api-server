const Path = require('path');
const ModuleUtils = require('../utils/moduleUtil');

const api = {
  swagger: '2.0',
  info: {
    // title: 'Test API',
    // description: 'Test API',
    // version: '1.0.0',
  },
  //  the domain of the service
  //  host: 127.0.0.1:3457
  //  array of all schemes that your API supports
  // schemes: ['http'],
  //  will be prefixed to all paths
  basePath: '',
  consumes: ['application/x-www-form-urlencoded'],
  produces: ['application/json'],
  paths: {},
};

const controllers = ModuleUtils.getDirectoryModule(Path.join(__dirname, '../controller'));

controllers.forEach((ctr) => {
  ctr.exports.forEach((item) => {
    const url = `/${[...ctr.properties, item.path].filter(i => i).join('/')}`;
    const method = item.type || 'get';

    const obj = api.paths[url] = Object.create(null);
    obj[method] = {};
  });
});

module.exports = [
  {
    comment: 'swagger接口文档',
    handle: async (ctx) => {
      ctx.body = api;
    },
  },
];
