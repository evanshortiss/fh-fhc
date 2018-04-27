/* globals i18n */
var common = require("../../../common.js");
var _ = require('underscore');

module.exports = {
  'desc' : i18n._('List all application templates'),
  'examples' :[{
    cmd : 'fhc templates apps',
    desc : i18n._("List all application templates of the target domain")
  },{
    cmd : 'fhc templates apps --id=<templateId>',
    desc : i18n._("List all application templates of the target domain and filter by id")
  }],
  'demand' : [],
  'alias' : {
    'id': 'i',
    0: 'id',
    'json': 'j'
  },
  'describe' : {
    'id' : i18n._('ID of the template'),
    'json' : i18n._('Output into json format')
  },
  'method' : 'get',
  'url' : 'box/api/templates/apps',
  'postCmd' : function(argv,response,cb) {
    if (argv.id) {
      response = [_.findWhere(response, {id: argv.id})];
    }
    if (!response || !response[0]) {
      return cb(i18n._('Application template not found with id:') + argv.id);
    }
    if (!argv.json) {
      response._table = common.createTableForTemplates(response, "apps");
    }
    return cb(null, response);
  }
};