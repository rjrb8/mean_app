import { Component, OnInit } from '@angular/core';
import { DatosService } from '../../services/datos.service';
import { NgForm } from '@angular/forms';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import { Employes } from 'src/app/models/employes';
import { departamentos } from 'src/app/models/employes';

declare var M: any;
declare var $:any;

@Component({
  selector: 'app-primer',
  templateUrl: './primer.component.html',
  styleUrls: ['./primer.component.css'],
  providers: [DatosService]
})

export class PrimerComponent implements OnInit {
  
  departamentos:departamentos[] = [
    { id: "Correctivo", nombre_dep: "Correctivo" },
    { id: "Luz", nombre_dep: "Luz" },
    { id: "Gerencia", nombre_dep: "Gerencia" }
  ];
  id: String;
  nombre: String;
  
  selectedDepartamentos: string = ''; 
  constructor(private DatosService: DatosService){}
  
  ngOnInit() {
   
    this.obtenerEmpleado();
  }
  
  addEmpleado(form?: NgForm) {
  //console.log(form.value);
    if (form.value._id) {
      if (confirm('desea modificar los datos?')) {
        this.DatosService.putEmpleado(form.value)
       .subscribe(res => {
          this.resetForm(form);
          this.obtenerEmpleado();
          M.toast({html: 'Empleado modificado'});
       });
      }
    } else {
      this.DatosService.postEmpleado(form.value)
       .subscribe(res => {
        this.resetForm(form);
        this.obtenerEmpleado();
        M.toast({html: 'Empleado guardado con exito!'});
        //console.log(res);    
      });
    }
  }

  editEmpleado(Persona: Employes) {   
    this.DatosService.selectedEmployee = Persona;
  }

  eliminarEmpleado(_id: string) {   
    if (confirm('Desea eliminar el empleado?')) {
      this.DatosService.deleteEmpleado(_id)
      .subscribe(res => {
       this.obtenerEmpleado(); 
       M.toast({html: 'Empleado eliminado con exito!'});
      });
    }
  }

  obtenerEmpleado(){
    this.DatosService.getEmpleado()
     .subscribe( res => {
       this.DatosService.employees1 = res as Employes[];
       //console.log(res);
     });
  };

  selectOption(id: number) {
    //getted from event
    console.log(id);
    //getted from binding
    console.log(this.selectedDepartamentos)
  }

  resetForm(form?: NgForm) {
    if (form) { 
      form.reset();
      this.DatosService.selectedEmployee = new Employes();
    }
  }

  iniciarModal() {
    var elements = document.getElementById('modal1');
    var instances = M.Modal.init(elements, {opacity: 0.5 });
    instances.open();
  }

  enviarModal(id, nombre){
    console.log('inciar');
    this.id = id;
    this.nombre = nombre;
    console.log(this.id);
   //`$(#exampleModal).M.modal('show')`;
    var elements = document.getElementById('modal1');
    var instances = M.Modal.init(elements, {opacity: 0.5 });
    instances.open();
  }

  cerrarModal(){
    var elements = document.getElementById('modal1');
    var instances = M.Modal.init(elements, {opacity: 0.5 });
    instances.close();
  }
}
