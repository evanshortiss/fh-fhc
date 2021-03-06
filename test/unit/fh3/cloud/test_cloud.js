var assert = require('assert');
var genericCommand = require('genericCommand');
var nockCloud2 = require('test/fixtures/app/fixture_cloud2');
var nockHosts = require('test/fixtures/app/fixture_hosts')(1);
var appReadNock = require('test/fixtures/app/fixture_appread.js')(1);
var cloud = genericCommand(require('cmd/fh3/app/cloud'));
module.exports = {
  setUp : function(cb) {
    return cb();
  },
  'test fh3 cloud': function(cb) {
    cloud({app : '1a', path : '/some/custom/cloud/host', 'data' : '', 'env' : 'development'}, function(err, data) {
      assert.equal(err, null, err);
      assert(data.ok === true);
      return cb();
    });
  },
  tearDown : function(cb) {
    nockHosts.done();
    nockCloud2.done();
    appReadNock.done();
    return cb();
  }
};
