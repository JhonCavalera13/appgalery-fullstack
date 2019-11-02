import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IsLogged implements CanActivate{

  constructor(private _auth: AuthService, private _router:Router) { }

  canActivate(){
    return !this._auth.getIdentity() ? this._router.navigate(['/login']) && true : false;
  }
}
