import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../services/servicios.service';
import { Router } from '@angular/router';

declare var M: any;

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  
  constructor(private ServiciosService: ServiciosService, private router:Router) { }

  ngOnInit() {
    this.ServiciosService.getUserProfile()
     .subscribe(
       res => {
         this.ServiciosService.userDetails = res['user'];
       },
       err => {
         console.log(err);
       }
     )
  }

  onLogout() {
    if (confirm('Desea salir de la aplicacion?')) {
      this.ServiciosService.deleteToken();
      M.toast({html: 'Estas saliendo del sistema'});
      this.router.navigate(['/login']);
    }
  }

}
