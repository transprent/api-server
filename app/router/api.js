'use strict';

/**
 * @param {Soul.Application} app - soul application
 */
module.exports = app => {
  const router = app.router;

  router.route({
    method: 'get',
    path: '/',
    controller: 'test.index',
  });

};
