// Copyright & License details are available under JXCORE_LICENSE file

var assert = require('assert');
var fs = require('fs');
var expectedVersion;

var vers = fs.readFileSync('src/node_version.h') + "";
var index = vers.indexOf('0.3.');
var index2 = vers.indexOf('"', index);
var str = vers.substr(index+4, index2-(index+4));

expectedVersion = "v 0.3." + str;

var color = jxcore.utils.console.setColor;
var str_insteadof = " instead of " + color(expectedVersion, "green");

if (!process.isPackaged) {
  var ret = jxcore.utils.cmdSync('"' + process.execPath + '" -jxv');
  var _out = ret.out.trim();

  assert.strictEqual(expectedVersion, _out, "Incorrect JXcore version (jx -jxv): "
    + color(_out, "yellow") + str_insteadof);
}

assert.strictEqual(expectedVersion, process.jxversion, "Incorrect JXcore version (process.jxversion): "
  + color(process.jxversion, "yellow") + str_insteadof);