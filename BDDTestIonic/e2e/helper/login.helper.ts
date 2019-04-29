import { GeneralHelper } from './general.helper';

export class LoginHelper {
  public static async checkLoginPage() {
    const docPage = await GeneralHelper.elementExists('page-home');
    if (docPage) {
      await this.tapToButton('logout', 'page-home');
    }
    return await GeneralHelper.elementExists('page-login');
  }

  public static async setUserName(value: string) {
    await GeneralHelper.sendKeys('page-login ion-item[id=\'username\'] input', value);
  }

  public static async setValueToItem(value: string, id: string, page: string) {
    await GeneralHelper.sendKeys('page-' + page + ' ion-item[id=\'' + id + '\'] input', value);
  }

  public static async setPassword(value: string) {
    await GeneralHelper.sendKeys('page-login ion-item[id=\'password\'] input', value);
  }

  public static async tapToButton(id: string, page: string = 'login') {
    await GeneralHelper.clickItem('page-' + page + ' button[id=\'' + id + '\']');
  }

  public static async tapToLink(id: string, page: string = 'login') {
    await GeneralHelper.clickItem('page-' + page + ' #' + id);
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
