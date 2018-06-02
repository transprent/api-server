'use strict';

const Controller = require('souljs').Controller;

class MessageController extends Controller {
  async index() {
    const { ctx } = this;
    const s = ctx.service.test.getUsersByNames();
    ctx.body = { a: s };
  }
}

module.exports = MessageController;
