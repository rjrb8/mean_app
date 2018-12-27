import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employes } from '../models/employes';
import { PrimerComponent } from '../component/primer/primer.component';

@Injectable({
  providedIn: 'root'
})

export class DatosService {
  
  selectedEmployee: Employes //Esta tomando el modelo de datos y lo esta importando 
  employees1: Employes[];
  readonly URL_API = 'http://localhost:3000/api/employes';

  constructor(private http: HttpClient) {
    this.selectedEmployee = new Employes();
   }

  getEmpleado() {
    return this.http.get(this.URL_API);
  }

  postEmpleado(empleado: Employes) {
    return this.http.post(this.URL_API, empleado)
  }

  putEmpleado(employees: Employes) {
    return this.http.put(this.URL_API + `/${employees._id}`, employees)
  }

  deleteEmpleado(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`)
  }

}
