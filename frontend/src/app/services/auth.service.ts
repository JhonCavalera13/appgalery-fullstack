import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getIdentity(){
    let identity = JSON.parse(localStorage.getItem('identify_user'));
    return identity ? identity : null;
  
  }

  getToken(){
    let token = localStorage.getItem('token');
    return token ? token : null;
  }

  logOut(){
    localStorage.removeItem("token");
  }


}
