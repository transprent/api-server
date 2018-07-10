const captcha = require('trek-captcha');

/**
 * 生成验证码图片
 */
exports.generate = async (session) => {
  const { token, buffer } = await captcha({ size: 5, style: -1 });
  session.captcha = {
    code: token,
    time: Date.now(),
  };
  return { code: 200, result: buffer };
};

/**
 * 校验验证码
 * @param {*} validateCode 
 */
exports.valid = (session, code) => {
  const captcha = session.captcha;
  session.captcha = null;
  if (!captcha) {
    return { code: 500, message: '验证码无效！' };
  }
  if (Date.now() - captcha.time > 120 * 1000) {
    return { code: 500, message: '验证码已过期！' };
  }
  if (captcha.code !== code) {
    return { code: 500, message: '验证码错误！' };
  }
  return { code: 200 };
};
