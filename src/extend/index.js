const Path = require('path');
const ModuleUtil = require('../utils/moduleUtil');

const debug = require('debug')('extend/index');

function loadExtend(name, proto) {
  const ext = ModuleUtil.resolveModule(Path.join(__dirname, name));

  if (!ext) debug('extend %s not not found', name);

  const properties = Object.getOwnPropertyNames(ext)
    .concat(Object.getOwnPropertySymbols(ext));

  for (const property of properties) {
    const extDescriptor = Object.getOwnPropertyDescriptor(ext, property);
    const protoDescriptor = Object.getOwnPropertyDescriptor(proto, property);

    if (protoDescriptor) {
      debug('%s already exit %o', name, protoDescriptor);
    }

    if (extDescriptor) {
      const descriptor = Object.assign({}, extDescriptor);
      Object.defineProperty(proto, property, descriptor);
    }
  }
}

module.exports = function (app) {
  loadExtend('context', app.context);

  return app;
};
