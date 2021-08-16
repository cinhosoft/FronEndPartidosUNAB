import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable, PartialObserver } from 'rxjs';
import { GLOBAL } from './global';
import { Router } from '@angular/router';import {map} from 'rxjs/operators';
import { UsuarioService } from './usuario.service';
import { Equipo } from '../models/equipo';
@Injectable({
  providedIn: 'root'
})
export class ConsultaequipoService {
  public url: String; 
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor(private _http: HttpClient, private router: Router,
    private usuarioService: UsuarioService) {
    this.url = GLOBAL.ulr;
  }
  
  private agregarAuthorizationHeader(){
    let token = this.usuarioService.token;
    if(token!=null){ 
      this.httpHeaders.append('Authorization','Bearer ' + token);
      //return this.httpHeaders.append('Access-Control-Allow-Origin','*');
      
    }
     this.httpHeaders;
   }
   
   getEquipos():Observable<any>{
     console.log("Traer Equipos");
     this.agregarAuthorizationHeader();
     //return this._http.get(this.url+'usuario/todos',{ headers:  this.agregarAuthorizationHeader()});
     return this._http.get<Equipo>('http://localhost:9011/equipo', { headers:  this.httpHeaders});

    
    }
}
