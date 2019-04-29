const { When, Then, setDefaultTimeout } = require('cucumber');
import { browser } from 'protractor';
import { LoginHelper } from '../helper/login.helper';
import { GeneralHelper } from '../helper/general.helper';
import { expect } from 'chai';

setDefaultTimeout(20000);
let currentPage;

When(/^Navigate to login page$/, (callback) => {
  browser.get('').then(() => {
    LoginHelper.checkLoginPage().then(value => {
      console.log(value);
      expect(value).to.equal(true);
      currentPage = 'login-page';
      callback();
    });
  });
});

When(/^Navigate to signup page$/, (callback) => {
  browser.get('').then(() => {
    LoginHelper.checkLoginPage().then(value => {
      console.log(value);
      expect(value).to.equal(true);
      LoginHelper.tapToButton('signup', 'login').then(() => {
        GeneralHelper.elementExists('app-signup-page').then(exists => {
          expect(exists).to.equal(true);
          currentPage = 'signup-page';
          callback();
        });
      });
    });
  });
});

When(/^set "([^"]*)" as "([^"]*)"$/, (id, value, callback) => {
  LoginHelper.setValueToItem(value, id, currentPage).then(() => callback());
});

When(/^tap button "([^"]*)" on "([^"]*)" page$/, (id, page, callback) => {
  LoginHelper.tapToButton(id, page).then(() => callback());
});

Then(/^I see "([^"]*)" page$/, (id, callback) => {
  GeneralHelper.elementExists('app-' + id).then(exists => {
    expect(exists).to.equal(true);
    callback();
  });
});

Then(/^Login is failed message with "([^"]*)"$/, (message, callback) => {
  GeneralHelper.alertExists(message).then((value) => {
    expect(value).to.equal(true);
    callback();
  });
});

Then(/^alert occurs with message "([^"]*)"$/, (message, callback) => {
  console.error(message);
  GeneralHelper.alertExists(message).then((value) => {
      console.error(value);
      expect(value).to.equal(true);
      callback();
  });
});
