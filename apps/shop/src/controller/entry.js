module.exports = [
  async (ctx, next) => {
    console.log('entry');
    await next();
  },
];