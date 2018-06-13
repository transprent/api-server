const Fs = require('fs');
const Path = require('path');

const logger = require('../utils/log4js').getLogger('utils/moduleUtil');

/**
 * 加载模块
 * @param {*} path - 模块路径
 */
function resolveModule(path) {
  let ext = null;
  try {
    ext = require(require.resolve(path));
  } catch (error) {
    logger.error('resolveModule ', path, 'error ', error);
  }
  return ext;
}
exports.resolveModule = resolveModule;

/**
 * 加载文件夹下的模块
 * @param {*} directory - 文件夹路径
 * @return {Array} - 模块数据
 */
function getDirectoryModule(directory) {
  const result = [];
  function finder(dir) {
    const files = Fs.readdirSync(dir);
    files.forEach((val) => {
      const fPath = Path.join(dir, val);
      const stats = Fs.statSync(fPath);
      if (stats.isDirectory()) finder(fPath);
      if (stats.isFile()) result.push(fPath);
    });
  }
  finder(directory);

  const modules = [];
  result.forEach((fullpath) => {
    const properties = fullpath
      .replace(directory, '').replace(/\..*$/, '')
      .split(/\/|\\/).filter(i => !!i);

    const exports = resolveModule(fullpath);
    modules.push({ fullpath, properties, exports });
  });
  return modules;
}
exports.getDirectoryModule = getDirectoryModule;

/**
 * 加载文件夹下的模块
 * @param {*} directory - 文件夹路径
 * @return {Object} - 模块数据
 */
function getDirectoryModuleTree(directory) {
  const moduleTree = Object.create(null);
  const modules = getDirectoryModule(directory);

  modules.forEach((item) => {
    let target = moduleTree;

    item.properties.forEach((property, index) => {
      if (!target[property] && index !== item.properties.length - 1) {
        target = Object.create(null);
      } else {
        target[property] = item.exports;
      }
    });
  });

  return moduleTree;
}
exports.getDirectoryModuleTree = getDirectoryModuleTree;
