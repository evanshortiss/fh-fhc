/* globals i18n */
var millicore = require("../../../utils/millicore.js");
var common = require("../../../common");
var fhreq = require("../../../utils/request");

module.exports = {
  'desc' : i18n._('Get git refs (branches and tags) list for an application'),
  'examples' :
    [{
      cmd : 'fhc git refs --app=<app> [--json]',
      desc : i18n._('Git pull the <app>')
    }],
  'demand' : ['app'],
  'alias' : {
    'app':'a',
    'domain':'domain',
    'clean':'c',
    'json':'j',
    0 : 'app'
  },
  'describe' : {
    'app' : i18n._('Unique 24 character GUID of the application'),
    'json' : i18n._('Output into json format')
  },
  'customCmd': function getGitRefs(params, cb) {
    millicore.widgForAppId(params.app, function(err, widgId) {
      if (err) {
        cb(err);
      } else {
        common.doGetApiCall(
          fhreq.getFeedHenryUrl(),
          `/box/api/projects/${widgId}/apps/${params.app}/remotes`,
          i18n._('Error getting refs'),
          (err, ret) => {
            if (err) {
              cb(err);
            } else if (params.json) {
              cb(null, ret);
            } else {
              ret._table = common.createTableForGitRefs(ret);
              cb(null, ret);
            }
          }
        );
      }
    });
  }
};