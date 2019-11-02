import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor() { }

  upload(url:string, files:Array<File>, token:string){
    return new Promise((resolve,reject) => {
      var formData:any = new FormData();
      var xhr = new XMLHttpRequest();

      for(var i = 0; i < files.length; i++){
        formData.append('img',files[i],files[i].name);
      }
    
      xhr.open('POST',url,true);//True es para que sea asincronica
      xhr.setRequestHeader('Authorization', token);
      xhr.send(formData);
      xhr.onreadystatechange= function(){
        //Estado 4 cuando la peticion es finalizada y se entego correctamente
        if(xhr.readyState == 4){
          if(xhr.status == 200){
            resolve(JSON.parse(xhr.response));
          }
          else{
            reject(JSON.parse(xhr.response));
          }
        }
      }
    });
  }
}
