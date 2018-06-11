const Model = require('../model');

exports.index = async (ctx) => {
  const d = await Model.Test.findAll();
  ctx.ok('text.index', d);
};
