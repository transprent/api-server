const target = Object.create(null);

/**
 * 请求响应封装
 * @param {*} param
 * @context {this} - koa.ctx
 */
const statusCodeMap = {
  ok: 200,
  // created: 201,
  // noContent: 204,
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  internalServerError: 500,
};
Object.keys(statusCodeMap).forEach((method) => {
  target[method] = function (...args) {
    const code = statusCodeMap[method];
    let message = null;
    let result = null;

    if (args.length < 2) {
      [result] = args;
    } else {
      [message, result] = args;
    }

    this.response.status = code;
    this.response.body = { code, message, result };
  };
});

/**
 * 自动参数获取
 */
Object.defineProperty(target, 'param', {
  enumerable: false,
  configurable: false,
  get() {
    return this.request.method.toLowerCase() === 'get' ? this.request.query : this.request.body;
  },
});

module.exports = target;
