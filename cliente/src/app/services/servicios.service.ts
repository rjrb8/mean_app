  
import { Injectable } from '@angular/core';
import { usuarios } from '../models/usuarios';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuariosComponent } from '../component/usuarios/usuarios.component';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  selectedUsuarios: usuarios;
  usuarios1:  usuarios[];
  userDetails: string;
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' })  };
  readonly URL_API = 'http://localhost:3000/api/usuarios';
 
  constructor(private http: HttpClient) { 
    this.selectedUsuarios = new usuarios();
    this.userDetails = '';
  }

  getUsuario() {
    return this.http.get(this.URL_API);
  }

  postUsuario(usuario: usuarios) {
    return this.http.post(this.URL_API, usuario, this.noAuthHeader)
  }

  putUsuario(usuario: usuarios) {
    return this.http.put(this.URL_API + `/${usuario._id}`, usuario)
  }

  deleteUsuario(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`)
  }

  buscarPorUsuario(_id: string) {
    return this.http.get(this.URL_API + `/${_id}`)
  }

  validarPorUsuario(usuario: usuarios) {
    return this.http.post(this.URL_API, usuario);
  }

  //Validaciones http
  login(authCredentials) {
    return this.http.post(this.URL_API + `/authenticate`, authCredentials, this.noAuthHeader);
  }

  getUserProfile() {
    return this.http.get(this.URL_API + `/inicio`);
  }
  //Metodos helper
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUserPayLoad() {
    var token = this.getToken();
    if (token) {
      var userPayLoad = atob(token.split('.')[1]);
      return JSON.parse(userPayLoad);
    }
    else
     return null;
  }
  

  isLoggeddIn() {
    var userPayLoad = this.getUserPayLoad();
    if (userPayLoad)
      return userPayLoad.exp > Date.now() / 1000;
    else 
     return false;
  }
}
