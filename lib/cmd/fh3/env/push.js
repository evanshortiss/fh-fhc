/* globals i18n */
module.exports = {
  'desc' : i18n._('Push cloud app environment variables'),
  'examples' :
    [{
      cmd : 'fhc env push --app=<app> --env=<environment>',
      desc : i18n._("Push cloud app environment variables from the <app> and <env>")
    }],
  'demand' : ['app'],
  'alias' : {
    'app': 'a',
    'env': 'e',
    0: 'app',
    1: 'env'
  },
  'describe' : {
    'app' : i18n._("Unique 24 character GUID of the cloud app."),
    'env': i18n._("Default value is dev. Environment ID for which you want to create the environment variable")
  },
  'url' : function(argv) {
    argv.env = argv.env || 'dev';
    return "box/api/apps/" + argv.app + "/env/"+ argv.env +"/envvars/push";
  },
  'method' : 'post'
};