'use strict';

const Service = require('souljs').Service;

class UserService extends Service {

  /*
   * 根据用户名列表查找用户列表
   * @param {Array} names 用户名列表
   * @return {Promise[users]} 承载用户列表的 Promise 对象
   */
  async getUsersByNames(names) {
    if (names.length === 0) {
      return [];
    }

    const query = { loginname: { $in: names } };
    return [];
  }
}

module.exports = UserService;
