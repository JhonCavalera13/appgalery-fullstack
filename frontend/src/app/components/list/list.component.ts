import { Component, OnInit } from '@angular/core';
import { FotografiasService } from 'src/app/services/fotografias.service';
import { AuthService } from 'src/app/services/auth.service';
import { Global } from 'src/app/services/global';
import { Animations } from 'src/app/animations/animations';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  animations: [Animations]
})
export class ListComponent implements OnInit {

  public token: string;
  public imagenes: any[];
  public url:string;
  public filterImage = '';

  constructor(
    private _serviceImages: FotografiasService,
    private _auth: AuthService,
    private _spinnerService: NgxSpinnerService
    ) {
    this.token = this._auth.getToken();
    this.url = Global.url;
  }

  ngOnInit() {
    this.getFotografiasAdmin();
    this._spinnerService.show();
  }

  getFotografiasAdmin(): any {
    this._serviceImages.getImages().then(response => {
      this.imagenes = response.images;
      this._spinnerService.hide();
    })
      .catch(err => {
        console.log(err);
      });
  }
}
