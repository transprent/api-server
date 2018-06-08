'use strict';

const Controller = require('souljs').Controller;

class MessageController extends Controller{
  async index(ctx) {
    const s = this.service.test.getUsersByNames();
    s();
    ctx.ok('操作成功！');
  }
}

module.exports = MessageController;
