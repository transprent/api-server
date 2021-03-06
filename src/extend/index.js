const Path = require('path');
const ModuleUtil = require('../utils/moduleUtil');

const logger = require('../utils/log4js').getLogger(__filename);

function loadExtend(name, proto) {
  const ext = ModuleUtil.resolveModule(Path.join(__dirname, name));

  if (!ext) logger.warn('extend %s not not found', name);

  const properties = Object.getOwnPropertyNames(ext)
    .concat(Object.getOwnPropertySymbols(ext));

  for (const property of properties) {
    const extDescriptor = Object.getOwnPropertyDescriptor(ext, property);
    const protoDescriptor = Object.getOwnPropertyDescriptor(proto, property);

    if (protoDescriptor) {
      logger.warn(name, ' already exit ', protoDescriptor);
    }

    if (extDescriptor) {
      const descriptor = Object.assign({}, extDescriptor);
      Object.defineProperty(proto, property, descriptor);
    }
  }
}

module.exports = (app) => {
  loadExtend('context', app.context);

  return app;
};
