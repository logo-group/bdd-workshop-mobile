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
