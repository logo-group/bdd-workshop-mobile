import { Injectable } from '@angular/core';
import { configuration } from '../../shared/configuration';
import { HttpClient } from '@angular/common/http';

/*
  Generated class for the AuthenticationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthenticationProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AuthenticationProvider Provider');
  }

  userId: string;

  async login(username: string, password: string) {
    const res: any = await this.http.post(configuration.baseUrl.service + 'user/login', { username: username, password: password }).toPromise();
    if (res.loginStatus) {
      this.userId = res.userId;
    } else {
      throw new Error(res.message);
    }
  }


  async signup(email: string, username: string, password: string) {
    const res = await this.http.post(
      configuration.baseUrl.service + 'user/signUp',
      {
        username: username,
        email: email,
        password: password
      }
    ).toPromise();
    return res;
  }

  async getUser(id: string) {
    const res: any = await this.http.get(
      configuration.baseUrl.service + 'user/user', {params: {userId: id}}
    ).toPromise();
    console.log(res);
    if (res.status) {
      throw new Error(res.error);
    }
    return res;
  }
}
