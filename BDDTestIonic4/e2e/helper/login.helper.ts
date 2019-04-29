import { GeneralHelper } from './general.helper';

export class LoginHelper {
  public static async checkLoginPage() {
    const docPage = await GeneralHelper.elementExists('app-home');
    if (docPage) {
      await this.tapToButton('logout', 'app-home');
    }
    return await GeneralHelper.elementExists('app-login-page');
  }

  public static async setUserName(value: string) {
    await GeneralHelper.sendKeys('app-login-page ion-item[id=\'username\'] input', value);
  }

  public static async setValueToItem(value: string, id: string, page: string) {
    await GeneralHelper.sendKeys('app-' + page + ' ion-item[id=\'' + id + '\'] input', value);
  }

  public static async setPassword(value: string) {
    await GeneralHelper.sendKeys('app-login-page ion-item[id=\'password\'] input', value);
  }

  public static async tapToButton(id: string, page: string = 'login') {
    await GeneralHelper.clickItem('app-' + page + ' ion-button[id=\'' + id + '\']');
  }

  public static async tapToLink(id: string, page: string = 'login') {
    await GeneralHelper.clickItem('app-' + page + ' #' + id);
  }

  public static async loginWithUser(username: string, password: string) {
    if (await this.checkLoginPage()) {
      await this.setUserName(username);
      await this.setPassword(password);
      await this.tapToButton('login');
      return true;
    } else {
      return false;
    }
  }
}
