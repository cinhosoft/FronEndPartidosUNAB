import { Injectable } from '@angular/core'; 
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Router } from '@angular/router';import {map} from 'rxjs/operators';
import { Usuario } from '../models/usuario';
import { tap } from 'rxjs/operators';
import { ILogin } from '../models/login';
import { IResponse }from '../models/response';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private _usuario: Usuario;
  private _token: string;
  private _username: string;
  private _idUsuario: string;
  public url: String; 

  constructor(private _http: HttpClient, private router: Router){
      this.url = GLOBAL.ulr;
      
  }

  public get username():string{
    if(this._username != null){
      return this._username;
    }else if(this._username == null && sessionStorage.getItem('username') != null){
      this._username = sessionStorage.getItem('username');
      return this._username;
    }
    return null;
  }

  public get idUsuario():string{
    if(this._idUsuario != null){
      return this._idUsuario;
    }else if(this._idUsuario == null && sessionStorage.getItem('id') != null){
      this._idUsuario = sessionStorage.getItem('id');
      return this._idUsuario;
    }
    return null;
  }

  public get token():string{
    if(this._token != null){
      return this._token;
    }else if(this._token == null && sessionStorage.getItem('token') != null){
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }
  
  register(user): Observable<any> { 
    return this._http.post<any>(this.url+'register', user);
    
  }
 
  login(username: String, password: String):Observable<any> {
        return this._http.post<any>(this.url + 'authenticate', {username: username,password: password});
          
        }
  logout() {
    this._token = null; 
    sessionStorage.clear();
  }
  
  guardarToken(token:string){
    this._token = token;
    sessionStorage.setItem('token',token)
  }
  guardarUsuario(id:string, username:string){
    let idUsuario =id;// datosUsuario.split("|")[0];
    let nombreUsuario = username;//.split("|")[1];
    this._username = nombreUsuario;
    this._idUsuario = idUsuario;
    sessionStorage.setItem('id',idUsuario)
    sessionStorage.setItem('username',nombreUsuario)
    
  }
  obtenerDatosToken(token:string):void{
    if (token!=null){
      return JSON.parse(atob(token.split(".")[1]));
    }{
      return null;
    }
    
  }
  esAutenticado():boolean{
    if(this.token!=null){
      return true;
    }else{
      return false;
    }
  }

}

