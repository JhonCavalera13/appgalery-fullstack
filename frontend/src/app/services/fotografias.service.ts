import { Injectable } from '@angular/core';
import { Global } from './global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FotografiasService {

  private url: string;

  constructor(private _http: HttpClient, private authService: AuthService) {
    this.url = Global.url;
  }


  headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authService.getToken()
  })


  getImagesById(id: number) {
    return this._http.get(`${this.url}/images/${id}`).toPromise().then(res => res);
  }

  getImages(): any {
    return this._http.get(`${this.url}/images`).toPromise().then(res => res);
  }

  //Buscar foto por nombre
  searchImage(name: string){
    return this._http.get(`${this.url}/images/search/images/${name}`).toPromise().then(res => res);
  }

  //lo consume el list.component
  getImagesAdmin(token:string): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this._http.get(`${this.url}/images/admin`, httpOptions).toPromise().then(res => res);
  }

  //lo consume new-image.component
  saveImage(image: any, token: string): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this._http.post(`${this.url}/images/save/image`, image, httpOptions)
    .toPromise().then(res => res);
  }

  updateImage(id: number, image: any, token: string): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this._http.put(`${this.url}/images/edit/${id}`, image, httpOptions).toPromise().then(res => res);
  }

  deleteImage(id: number){
    return this._http.delete(`${this.url}/images/remove/image/${id}`);
  }
}
