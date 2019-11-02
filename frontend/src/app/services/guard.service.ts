import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate{

  constructor(private _auth: AuthService, private _router:Router) { }

  canActivate(){
    return this._auth.getToken() ? true : this._router.navigate(['/login']) && false;
  }

}
