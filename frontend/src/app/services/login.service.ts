import { Injectable } from '@angular/core';
import { Global } from '../services/global';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string;

  constructor(private _http: HttpClient) {
    this.url = Global.url;

  }

  loginUser(user: any, getToken?: boolean): any {
    if (getToken) {
      user.token = getToken;
    }
    return this._http.post(`${this.url}/users/login`, user).toPromise()
      .then(res => res)
      .catch(err => console.log(err));
  }

  registerUser(user: any) {
    const authData = {
      username: user.username,
      email: user.email,
      password: user.password
    }
    return this._http.post(`${this.url}/users/create`, authData);
  }

  getuser(email:string){
    return this._http.get(`${this.url}/users/search/${email}`);
  }
}
