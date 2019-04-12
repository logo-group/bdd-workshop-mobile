import { Injectable } from '@angular/core';
import { configuration } from 'src/shared/configuration';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {
  userId: string;
  constructor(private http: HttpClient) { }

  async login(username: string, password: string) {
    try {
      const res: any = await this.http.post(
        configuration.baseUrl.service + 'user/signIn',
        null,
        { params: { username: username, password: password }, responseType: 'text' }
      ).toPromise();
      this.userId = res;
    } catch (err) {
      const e = JSON.parse(err.error);
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
      const e = err.error;
      throw new Error(e.message);
    }
  }

  async getUser(id: string) {
    try {
      const res: any = await this.http.get(
        configuration.baseUrl.service + 'user/user', { params: { userId: id } }
      ).toPromise();
      return res;
    } catch (err) {
      const e = err.error;
      throw new Error(e.message);
    }
  }
}
