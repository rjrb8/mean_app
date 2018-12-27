export class usuarios {
  
  constructor(_id = '', name = '', usuario = '', contrasena = '', correo = '') {
    this._id = _id;
    this.name = name;
    this.usuario = usuario;
    this.contrasena = contrasena;
    this.correo = correo;
  }

  _id: string;
  name: string;
  usuario:string;
  contrasena:string;
  correo:string;
}
