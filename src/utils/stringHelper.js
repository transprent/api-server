const uuidV1 = require('uuid/v1');
const crypto = require('crypto');

exports.uuid = () => {
  return uuidV1().replace(/-/gi, '');
};

exports.md5 = (str) => {
  const md5 = crypto.createHash('md5');
  md5.update(str);
  return md5.digest('hex');
};
