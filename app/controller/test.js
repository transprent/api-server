'use strict';

const Controller = require('souljs').Controller;

class MessageController {
  async index(ctx) {
    const s = ctx.service.test.getUsersByNames();
    ctx.body = { a: s };
  }
}

module.exports = MessageController;
