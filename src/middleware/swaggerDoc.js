const Path = require('path');
const convert = require('joi-to-json-schema');
const ModuleUtils = require('../utils/moduleUtil');


function generateApi() {
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
    tags: [],
  };

  const controllers = ModuleUtils.getDirectoryModule(Path.join(__dirname, '../controller'));

  controllers.forEach((ctr) => {
    ctr.exports.forEach((item) => {
      const url = `/${[...ctr.properties, item.path].filter(i => i).join('/')}`;
      const method = item.type || 'get';
      const tags = ctr.properties[0];

      const obj = {
        summary: item.comment,
        tags: [tags],
        produces: ['application/json'],
        responses: { 200: { code: 200, message: '', result: '' } },
        parameters: [],
      };

      if (item.param) {
        const param = convert(item.param);
        Object.keys(param.properties).forEach((key) => {
          const cont = param.properties[key];
          obj.parameters.push({
            name: key,
            in: method === 'get' ? 'query' : 'body',
            type: cont.type,
            required: param.required.find(i => i === key),
            description: key,
          });
        });
      }

      if (!api.tags.find(i => i.name === tags)) {
        api.tags.push({
          name: tags,
          description: '',
        });
      }

      api.paths[url] = { [method]: obj };
    });
  });
  return api;
}


/**
 * Return middleware that handle exceptions in Koa.
 * Dispose to the first middleware.
 *
 * @return {function} Koa middleware.
 */
module.exports = (options) => {
  return async (ctx, next) => {
    if (ctx.path === options.path) {
      ctx.body = generateApi();
    } else {
      next();
    }
  };
};
