var assert = require('assert');
require('test/fixtures/fixture_services');
var servicesCmd = require('cmd/fh3/services');
var serviceFixtures = require('test/fixtures/fixture_service');
var dataSourceFixtures = require('test/fixtures/appforms/fixture_data_source');

var sinon = require('sinon');
var proxyquire = require('proxyquire');

var mockService = serviceFixtures.get();
var mockDataSource = dataSourceFixtures.get();


module.exports = {
  "It Should List Data Sources For A Service": function(done){
    servicesCmd({_: ['data-sources', mockService.guid]}, function(err, serviceDataSources){
      assert.ok(!err, "Expected No Error");
      //Should be an array of data sources.
      assert.equal(mockDataSource._id, serviceDataSources[0]._id);

      done();
    });
  },

  'should set a nested title property on apps[0]': function (done) {
    var newTitle = 'shadowman\'s awesome app';

    var mockGuid = 'someserviceguid'
      , mockUrl = 'dummy.feedhenry.com';

    var commonMocks = {
      doGetApiCall: sinon.stub()
    };

    var fhreqMocks = {
      getFeedHenryUrl: sinon.stub().returns(mockUrl),
      PUT: sinon.stub()
    };

    var STUB_NAMES = {
      COMMON: '../../common',
      REQUEST: '../../utils/request'
    };

    var stubs = {};
    stubs[STUB_NAMES.COMMON] = commonMocks;
    stubs[STUB_NAMES.REQUEST] = fhreqMocks;

    // readService calls this so wire it to return dummy data
    commonMocks.doGetApiCall.yields(null, serviceFixtures.get());

    // PUT call response format - cb(err, remoteData, raw, response)
    fhreqMocks.PUT.yields(null, {}, '{}', { statusCode: 200 })

    var service = proxyquire('cmd/fh3/services', stubs);

    service({
      _: [
        'update',
        mockGuid,
        'apps[0].title',
        newTitle
      ]
    }, function (err) {
      assert.ok(!err);
      assert.ok(
        stubs[STUB_NAMES.COMMON].doGetApiCall.calledOnce,
        'common should be called to get existing app info'
      );

      // Generate expected data for PUT
      var expectedPutData = serviceFixtures.get();
      expectedPutData.apps[0].title = newTitle;

      assert.ok(
        stubs[STUB_NAMES.REQUEST].PUT.calledWith(
          mockUrl,
          'box/api/connectors/' + mockGuid,
          expectedPutData
        ),
        'PUT should be called with the expected API url and data'
      );

      done();
    });
  }
};
