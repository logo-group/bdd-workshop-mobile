exports.config = {

  seleniumAddress: 'http://localhost:4723/wd/hub',
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    require: ['./e2e/e2eTypescript/step_definitions/*.step.ts']
  },
  specs: ['./e2e/feature/*.feature'],

  // app directory have to be updated
  // android emulator have to run and device name, platform version updated with runned emulator info.
  capabilities: {
    browserName: '',
    'appium-version': '1.12.1',
    platformName: 'android',
    platformVersion: '9',
    deviceName: 'emulator-5554',
    autoWebview: true,
    nativeInstrumentsLib: true,
    fullReset: true,
    app: "/Users/oguzakpinar/Desktop/AngularWork/bdd-workshop-mobile/BDDTestIonic4/platforms/android/app/build/outputs/apk/debug/app-debug.apk"
    // automation-name ?
  },

  baseUrl: '',

  onPrepare: function () {
    var wd = require('wd'),
      protractor = require('protractor'),
      wdBridge = require('wd-bridge')(protractor, wd);
    wdBridge.initFromProtractor(exports.config);

    require('ts-node').register({
      project: require('path').join(__dirname, './e2e/tsconfig.e2e.json')
    });

    var defer = protractor.promise.defer();
    browser.ignoreSynchronization = true;
    browser.executeScript('return window.location;').then(function (location) {
      browser.resetUrl = 'file://';
      browser.baseUrl = location.origin + location.pathname;
      defer.fulfill();
    });
    return defer.promise;
  },
  useAllAngular2AppRoots: true
};
