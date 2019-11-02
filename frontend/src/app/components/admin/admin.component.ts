import { Component, OnInit, HostBinding } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Animations } from 'src/app/animations/animations';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  animations:[Animations]
})
export class AdminComponent implements OnInit {

  @HostBinding('@anim-admin') animAdmin;
  public identity:any;
 

  constructor(
    private _auth:AuthService, 
    private _router:Router, 
    ) {
    this.identity = this._auth.getIdentity()
   }

  ngOnInit() {
  }

  logout(){
    this._auth.logOut();
    this._router.navigate(['/login']);

  }



}
