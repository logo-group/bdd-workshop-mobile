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
  }

  userId: string;

  async login(username: string, password: string) {
    try {
      const res: any = await this.http.post(configuration.baseUrl.service + 'user/signIn', null, { params: { username: username, password: password }, responseType: 'text' }).toPromise();
      this.userId = res;
    } catch (err) {
      let e = JSON.parse(err.error);
      throw new Error(e.message);
    }
  }


  async signup(email: string, username: string, password: string) {
    try {
      const res = await this.http.post(
        configuration.baseUrl.service + 'user/signUp',
        {
          username: username,
          email: email,
          password: password
        }
      ).toPromise();
      return res;
    } catch (err) {
      let e = err.error;
      throw new Error(e.message);
    }
  }

  async getUser(id: string) {
    try{
      const res: any = await this.http.get(
        configuration.baseUrl.service + 'user/user', { params: { userId: id } }
      ).toPromise();
      return res;
    } catch (err) {
      let e = err.error;
      throw new Error(e.message);
    }
  }
}
