export class Employes {
  
  constructor(_id = '', name = '', position = '', office = '', salary = 0, departamento='') {
    this._id = _id;
    this.name = name;
    this.position = position;
    this.office = office;
    this.salary = salary;
    this.departamento = departamento;
  }

  _id: string;
  name: string;
  position:string;
  office:string;
  salary:number;
  departamento:String;
}

export class departamentos {

  constructor() {}

  id: string;
  nombre_dep: string;

}
