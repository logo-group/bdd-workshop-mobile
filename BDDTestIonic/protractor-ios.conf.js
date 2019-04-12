exports.config = {

  seleniumAddress: 'http://localhost:4723/wd/hub',
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    require: ['./e2e/steps/*.step.ts']
  },
  specs: ['./e2e/features/*.feature'],


  // app directory have to be updated
  capabilities: {
    browserName: '',
    'appium-version': '1.12.1',
    platformName: 'iOS',
    platformVersion: '12.1',
    deviceName: 'iPhone X',
    app: '/Users/oguzakpinar/Desktop/AngularWork/bdd-workshop-mobile/BDDTestIonic/platforms/ios/build/emulator/MyApp.app',
    automationName: 'XCUITest',
    autoWebview: true,
    fullReset: true
  },

  baseUrl: '',

  onPrepare: function() {
    var wd = require('wd'),
      protractor = require('protractor'),
      wdBridge = require('wd-bridge')(protractor, wd);
    wdBridge.initFromProtractor(exports.config);

    require('ts-node').register({
      project: require('path').join(__dirname, './e2e/tsconfig.e2e.json')
    });

    var defer = protractor.promise.defer();
    browser.ignoreSynchronization = true;
    browser.executeScript('return window.location;').then( function(location){
      browser.resetUrl = 'file://';
      browser.baseUrl = location.origin + location.pathname;
      defer.fulfill();
    });
    return defer.promise;
  },
  useAllAngular2AppRoots: true
};
