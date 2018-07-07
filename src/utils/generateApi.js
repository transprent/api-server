const Path = require('path');
const convert = require('joi-to-json-schema');
const ModuleUtils = require('../utils/moduleUtil');
const { API_CATG } = require('../utils/constant');


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
    consumes: ['application/json', 'application/x-www-form-urlencoded'],
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
        if (method === 'get') {
          Object.keys(param.properties).forEach((key) => {
            const cont = param.properties[key];
            obj.parameters.push({
              name: key,
              in: 'query',
              type: cont.type,
              required: (param.required || []).find(i => i === key),
              description: key,
            });
          });
        } else {
          obj.parameters.push({
            description: 'body',
            required: true,
            name: 'body',
            in: 'body',
            schema: {
              properties: param.properties,
            },
          });
        }
      }

      if (!api.tags.find(i => i.name === tags)) {
        api.tags.push({
          name: tags,
          description: API_CATG[tags],
        });
      }

      api.paths[url] = { [method]: obj };
    });
  });
  return api;
}

module.exports = generateApi;
