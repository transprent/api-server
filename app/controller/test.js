'use strict';

const Controller = require('souljs').Controller;

class MessageController extends Controller{
  async index(ctx) {
    const s = this.service.test.getUsersByNames();
    ctx.body = { a: s };
  }
}

module.exports = MessageController;
