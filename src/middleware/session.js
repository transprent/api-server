/**
 * Return middleware that handle exceptions in Koa.
 * Dispose to the first middleware.
 *
 * @return {function} Koa middleware.
 */
const session = require('koa-session');
const stroe = {};

module.exports = (app) => {
  return session({
    key: 'mysoul:admin',
    maxAge: 86400000,
    httpOnly: true,
    signed: true,
    store: {
      get: async (key, maxAge, { rolling }) => {
        return stroe[key];
      },
      set: async(key, sess, maxAge, { rolling, changed }) => {
        return stroe[key] = sess;
      },
      destroy: async(key) => {
        return stroe[key] = null;
      }
    },
  }, app);
};