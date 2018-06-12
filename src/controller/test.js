const Model = require('../model');

exports.index = async (ctx) => {
  const d = await Model.Test.geta();
  ctx.ok('text.index', d);
};
