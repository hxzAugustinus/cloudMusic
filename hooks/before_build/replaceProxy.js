var path = require('path');
var fs = require('fs');

module.exports = function (context) {
  console.info('replaceProxy:');
  var configFilePath = path.join(context.opts.projectRoot, 'www', 'build', 'main.js');
  var originData = fs.readFileSync(configFilePath, 'utf-8');
  var proxyData = originData.replace('this.url = "/cloudMusic/";', 'this.url = "http://192.168.3.236:3000/";');
  fs.writeFileSync(configFilePath, proxyData);
}
