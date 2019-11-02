import { Component, OnInit, Input } from '@angular/core';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-fotografia',
  templateUrl: './fotografia.component.html',
  styleUrls: ['./fotografia.component.css']
})
export class FotografiaComponent implements OnInit {

  @Input() image:any;
  @Input() seleccionada:any;
  public url:string;

  constructor() { 
    this.url = Global.url;
  }

  ngOnInit() {
  }

}
