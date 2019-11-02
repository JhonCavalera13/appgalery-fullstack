import { Component, OnInit } from '@angular/core';
import { FotografiasService } from 'src/app/services/fotografias.service';
import { Global } from 'src/app/services/global';
import { ActivatedRoute, Router } from '@angular/router';
import { Animations } from 'src/app/animations/animations';
import { AuthService } from 'src/app/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [FotografiasService],
  animations: [Animations]
})
export class HomeComponent implements OnInit {

  public images: any[];
  public url: string;
  public imageSelected: any = {};
  public ver_mas: boolean = false;
  public imagen_actual: number = 0;
  public direccion: string;
  public show_thumbs: boolean = false;

  constructor(
    private serviceImage: FotografiasService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _auth: AuthService,
    private _spinnerService: NgxSpinnerService
  ) {
    this.url = Global.url;
  }

  ngOnInit() {
    this.getImages();
    this.showIconLogin();
    this._spinnerService.show();
  }

  getImages() {
  
    this.serviceImage.getImages().then(img => {
      this.images = img.images;//el .images viene desde la promesa del backend
      this._route.params.forEach((params) => {
        let id = params['id'];
        this.imageSelected.fotografia = this.images.find(result => {
          return result.id == id;
        });
        if (!this.imageSelected.fotografia) {
          this.imageSelected.fotografia = this.images[0];
        }
        let next = this.images.indexOf(this.imageSelected.fotografia) + 1;
        let prev = this.images.indexOf(this.imageSelected.fotografia) - 1;

        this.imageSelected.siguiente = next < this.images.length ? this.images[next].id : null;
        this.imageSelected.anterior = prev >= 0 ? this.images[prev].id : null;

        this.moveImage(this.imageSelected.fotografia);
        this._spinnerService.hide();
      });
    })
      .catch(err => console.log(err));
  }

  moveImage(image: any) {
    this.show_thumbs = false;
    if (image.id > this.imagen_actual) {
      this.direccion = "right";
    }
    else {
      this.direccion = "left";
    }
    this.imagen_actual = image.id;
    this._router.navigate(['/home', this.imagen_actual]);
  }

  showIconLogin(){
    return this._auth.getToken() ? true : false;
  }


  logout(){
    this._auth.logOut();
    this._router.navigate(['/login']);
  }

}

