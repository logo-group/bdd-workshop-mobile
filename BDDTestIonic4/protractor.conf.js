exports.config = {
  allScriptsTimeout: 11000,
  specs: ['./e2e/features/*.feature'],
  capabilities: {
    browserName: 'chrome',
    maxInstances: 1,
    chromeOptions: { args: ['--window-size=600,1080'] }
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'custom',

  frameworkPath: require.resolve('protractor-cucumber-framework'),

  cucumberOpts: {
    require: ['./e2e/steps/*.step.ts']
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './e2e/tsconfig.e2e.json')
    });
  }
};