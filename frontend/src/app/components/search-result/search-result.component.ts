import { Component, OnInit } from '@angular/core';
import { FotografiasService } from '../../services/fotografias.service';
import { Global } from '../../services/global';
import { Animations } from 'src/app/animations/animations';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
  animations:[Animations]
})
export class SearchResultComponent implements OnInit {

  public image:any = {};
  public name: string;
  public url:string;
  public isError = false;

  constructor(
    private _imageService: FotografiasService,
    private _spinnerService: NgxSpinnerService
    ) {
    this.url = Global.url;
   }

  ngOnInit() {
  }

  searchImage(){
    this._spinnerService.show();
    this._imageService.searchImage(this.name).then(data => {
     
      setTimeout(()=>{
        this._spinnerService.hide();
      },500);
      this.image = data;
      this.isError = false;
    })
    .catch(error => {
        this._spinnerService.hide();
    }); 
  }
}
