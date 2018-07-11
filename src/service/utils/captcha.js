const Captcha = require('trek-captcha');
const logger = require('../../utils/log4js').getLogger('service/utils/captcha');

/**
 * 生成验证码图片
 * @author kun
 * 2018-7-11
 */
exports.generate = async (session) => {
  const { token, buffer } = await Captcha({ size: 5, style: -1 });
  session.captcha = {
    token,
    time: Date.now(),
  };
  logger.info('生成验证码：', token);
  return { code: 200, result: buffer };
};

/**
 * 校验验证码
 * @param {*} validateCode
 */
exports.valid = (session, code) => {
  if (!session.captcha) {
    return { code: 400, message: '验证码无效！' };
  }
  if (Date.now() - session.captcha.time > 120 * 1000) {
    return { code: 400, message: '验证码已过期！' };
  }
  if (session.captcha.token !== code) {
    return { code: 400, message: '验证码错误！' };
  }
  session.captcha = null;
  return { code: 200 };
};
