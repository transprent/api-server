'use strict';

/**
 * @param {Soul.Application} app - soul application
 */
module.exports = app => {
  const router = app.router;
  const { controller } = app;

  const { test } = controller;
  const { api } = controller.api;

  router
  .get('/', (ctx, next) => {
    ctx.body = 'Hello World!';
  })

  debugger

  router.get('/tet', test.index);
  router.get('/api', api.index);
};
