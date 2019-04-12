exports.config = {
  framework: 'custom',

  frameworkPath: require.resolve('protractor-cucumber-framework'),

  cucumberOpts: {
    require: ['./e2e/steps/*.step.ts'],
    // tags: '@signup or @login'
  },

  specs: ['./e2e/features/*.feature'],

  capabilities: {
    browserName: 'chrome',
    maxInstances: 1,
    chromeOptions: {args: ['--window-size=600,1080']}
  },
  
  baseUrl: 'http://localhost:8100/',

  useAllAngular2AppRoots: true,
  beforeLaunch: function () {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    require('connect')().use(require('serve-static')('www')).listen(8100);
  }
};
