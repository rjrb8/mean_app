import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../services/servicios.service';
import { NgForm } from '@angular/forms';
import { usuarios } from '../../models/usuarios';

declare var M: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [ServiciosService]
})
export class UsuariosComponent implements OnInit {

  constructor(private ServiciosService: ServiciosService) { }

  ngOnInit() {
    this.obtenerUsuario();
  }

  addUsuario(form?: NgForm) {
    //console.log(form.value);
      if (form.value._id) {
        if (confirm('desea modificar los datos?')) {
          this.ServiciosService.putUsuario(form.value)
            .subscribe(res => {
                this.resetForm(form);
                this.obtenerUsuario();
                M.toast({html: 'Usuario modificado'});
            });
        }
      } else {
        this.ServiciosService.postUsuario(form.value)
         .subscribe(res => {
          this.resetForm(form);
          this.obtenerUsuario();
          M.toast({html: 'Usuario guardado con exito!'});
          //console.log(res);    
        });
      }
    }
  
    editUsuario(usuario: usuarios) {   
      this.ServiciosService.selectedUsuarios = usuario;
    }
  
    eliminarUsuario(_id: string) {   
      if (confirm('Desea eliminar el Usuario?')) {
        this.ServiciosService.deleteUsuario(_id)
        .subscribe(res => {
         this.obtenerUsuario(); 
         M.toast({html: 'Usuario eliminado con exito!'});
        });
      }
    }
  
    obtenerUsuario(){
      this.ServiciosService.getUsuario()
       .subscribe( res => {
         this.ServiciosService.usuarios1 = res as usuarios[];
         console.log(res);
       });
    };
  
    resetForm(form?: NgForm) {
      if (form) { 
        form.reset();
        this.ServiciosService.selectedUsuarios = new usuarios();
      }
    }

}
