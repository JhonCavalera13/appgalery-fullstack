import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FotografiasService } from 'src/app/services/fotografias.service';
import { Global } from 'src/app/services/global';
import { AuthService } from 'src/app/services/auth.service';
import { UploadService } from 'src/app/services/upload.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-image',
  templateUrl: './edit-image.component.html',
  styleUrls: ['./edit-image.component.css']
})
export class EditImageComponent implements OnInit {

  public image: any = {}
  public image_selected: string;
  public token: string;
  public url: string;
  public filesToUpload: Array<File>;

  constructor(
    private _route: ActivatedRoute,
    private _serviceImage: FotografiasService,
    private _auth: AuthService,
    private _upload: UploadService,
    private _router: Router,
  ) {
    this.token = _auth.getToken();
    this.url = Global.url;
  }

  ngOnInit() {
    this.getImage();
  }

  getImage() {
    this._route.params.forEach((params) => {
      this._serviceImage.getImagesById(params['id'])
        .then(response => {
          this.image = response;
          console.log(this.image);
        })
        .catch(err => console.log(err));
    });
  }

  editImage() {
    this._serviceImage.updateImage(this.image.id, this.image, this.token).then(response => {
      if (this.image) {
        this._upload.upload(`${this.url}/images/upload/${response.image.id}`, this.filesToUpload, this.token)
          .then(image => {
            this._router.navigate(['/admin/list']);
          })
          .catch(err => {
            console.log(err);
            this._router.navigate(['/admin/list']);
          })
      }
    })
      .catch(err => {
        console.log(err);
      });
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = fileInput.target.files.length > 0 ? <Array<File>>fileInput.target.files : null;
    this.image_selected = this.filesToUpload ? fileInput.target.files[0].name : '';
  }

  deleteImage(id: number) {
 /*    fetch(`${this.url}/images/edit/${this.image.id}`, {
      method: 'DELETE'
    }).then(() => {
      console.log('removed');
    }).catch(err => {
      console.error(err);
    }); */
    this._serviceImage.deleteImage(id).subscribe();
  }
}
