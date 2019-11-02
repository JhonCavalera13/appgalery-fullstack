import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public usuario: any = {};
  public recordarme = false;

  constructor(private loginService: LoginService, private _router: Router) { }

  ngOnInit() {
   
  }

  onRegister() {
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Creando cuenta..'
    });
    Swal.showLoading();
      this.loginService.registerUser(this.usuario).subscribe(res => {
        if (this.recordarme) {
          localStorage.setItem('email', this.usuario.email);
        }
        this._router.navigate(['/login']);
        Swal.close();
        Swal.fire({
          type: 'info',
          text: 'Se ha creado el usuario exitosamente'
        });
      }, (err) => {
        Swal.fire({
          type: 'error',
          title: 'Ocurrio un erro al registrarse..'
        });
      });
    }
    
}




