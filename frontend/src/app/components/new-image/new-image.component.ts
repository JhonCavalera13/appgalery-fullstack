import { Component, OnInit } from '@angular/core';
import { FotografiasService } from 'src/app/services/fotografias.service';
import { AuthService } from 'src/app/services/auth.service';
import { UploadService } from 'src/app/services/upload.service';
import { Global } from 'src/app/services/global';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-new-image',
  templateUrl: './new-image.component.html',
  styleUrls: ['./new-image.component.css']
})
export class NewImageComponent implements OnInit {

  public image: any = {}
  public token: string;
  public filesToUpoload: Array<File>;
  public image_selected: string;
  public url: string;

  constructor(
    private _serviceImages: FotografiasService,
    private _auth: AuthService,
    private _upload: UploadService,
    private router: Router,
    private dialog: MatDialog
    ) {
    this.token = _auth.getToken();
    this.url = Global.url;
    this.image.private = 0;
  }

  ngOnInit() {
  }

  addImage() {
    this.image.usuario_creacion = this._auth.getIdentity().usuario;
    if (this.filesToUpoload) {
      this._serviceImages.saveImage(this.image, this.token).then(response => {
          this._upload.upload(`${this.url}/images/upload/${response.image.id}`, this.filesToUpoload, this.token)
            .then(images => {
              console.log(images);
              this.router.navigate(['/admin/list']);
            })
            .catch(err => {
              console.log(err);
              this.router.navigate(['/admin/list']);
            })
        }
      )
      .catch(err => {
        console.log(err);
      });
    }
    else{
      this.openDialog();    
    }
      
  }

  openDialog(){
    this.dialog.open(DialogComponent);
  }


  fileChangeEvent(fileInput: any) {
    this.filesToUpoload = fileInput.target.files.length > 0 ? <Array<File>>fileInput.target.files : null;
    this.image_selected = this.filesToUpoload ? fileInput.target.files[0].name : '';
  }

  private(check:any){
    this.image.private = check.checked ? 1 : 0; 
    console.log(this.image.private);
  }

}
