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
      // eslint-disable-next-line
      get: async (key, maxAge, { rolling }) => {
        return stroe[key];
      },
      // eslint-disable-next-line
      set: async (key, sess, maxAge, { rolling, changed }) => {
        // eslint-disable-next-line
        return stroe[key] = sess;
      },
      destroy: async (key) => {
        // eslint-disable-next-line
        return stroe[key] = null;
      },
    },
  }, app);
};
