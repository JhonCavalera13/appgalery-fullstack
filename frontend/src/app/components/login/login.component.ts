import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { map } from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public usuario: any = {};
  public isError = false;
  public recordarme = false;
  public email:any = {};

  constructor(private loginService: LoginService, private _router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('email')){
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    } 
  }

  login() {
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Iniciando Sesión..'
    });
    Swal.showLoading();
    this.loginService.loginUser(this.usuario)
      .then(response => {
        this.loginService.loginUser(this.usuario, true)
        .then(res => {
            localStorage.setItem('identify_user', JSON.stringify(response.user));
            localStorage.setItem('token', res.token);
            this._router.navigate(['/admin/list']);
            if(this.recordarme){
              localStorage.setItem('email', this.usuario.email);
            }else {
              localStorage.removeItem('email');
           }
            Swal.close();
          }).catch(err => {
            Swal.fire({
              type: 'error',
              title: 'Error al autenticar ',
              text: 'Usuario o Contraseña incorrecto'
            });

          });
      }).catch(err => {;
        Swal.fire({
          type: 'error',
          title: 'Error al autenticar ',
          text: 'Usuario o Contraseña incorrecto'
        });
      });
  }
}
