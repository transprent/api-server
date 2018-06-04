const Controller = require('souljs').Controller;

class MessageController {
  async index() {
    const { ctx } = this;
    ctx.body = { a: 'api/index' };
  }
}

module.exports = MessageController;
