import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiciosService } from '../../services/servicios.service';
import { usuarios } from '../../models/usuarios';

declare var M: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ServiciosService]
})
export class LoginComponent implements OnInit {

  constructor(private ServiciosService: ServiciosService, private router: Router) { }
  serverErrorMessages: string;
  ngOnInit() {
    if (this.ServiciosService.isLoggeddIn())
      this.router.navigateByUrl('/inicio');
  }
  //Aplciar la validacion aca
  validarUsuarios(form: NgForm) {
    if (form.value.usuario.length == 0 || /^\s+$/.test(form.value.usuario)) 
      M.toast({html: 'El campo nombre no puede estar en blanco'});
    else if (!(/^[0-9A-Za-z\s]+$/g.test(form.value.usuario))) {
      M.toast({html: 'El campo nombre debe tener solo letras'});
    }
    else if (form.value.contrasena.length == 0 || /^\s+$/.test(form.value.contrasena))
      M.toast({html: 'El campo contraseña no puede estar en blanco'});
    else {
      this.ServiciosService.login(form.value)
        .subscribe(
          res => {
            //console.log(res);
            this.ServiciosService.setToken(res['token']);
            this.router.navigateByUrl('/inicio'); 
      },
      err => {
        this.serverErrorMessages = err.error.message;
        M.toast({html: this.serverErrorMessages});
      });
    }  
  };
  
  resetForm(form?: NgForm) {
    if (form) { 
      form.reset();
      this.ServiciosService.selectedUsuarios = new usuarios();
    }
  }

}
