/**
 * @param {Application} app - egg application
 */
module.exports = app => {
  require('./api')(app);
};