'use strict';

const Controller = require('souljs').Controller;

class MessageController extends Controller {
  async index() {
    debugger
    const { ctx } = this;
    ctx.body = { a: 'api/index' };
  }
}

module.exports = MessageController;
