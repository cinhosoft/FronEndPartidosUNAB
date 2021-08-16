import { Injectable } from '@angular/core'; 
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable, PartialObserver } from 'rxjs';
import { GLOBAL } from './global';
import { Router } from '@angular/router';import {map} from 'rxjs/operators';
import { UsuarioService } from './usuario.service';
import { Partidos } from '../models/partidos';
import { PartidoDAO } from '../models/partidoDAO';
@Injectable({
  providedIn: 'root'
})
export class ConsultapartidoService {
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
    }
      this.httpHeaders;
   }
   getPartidos():Observable<Partidos[]>{
     this.agregarAuthorizationHeader();
     return this._http.get(this.url + 'partido',{headers:  this.httpHeaders}).pipe(
       map(response => response as Partidos[])
     );
   }
   getPartido(id):Observable<PartidoDAO>{
    this.agregarAuthorizationHeader();
    return this._http.get<PartidoDAO>(this.url + 'partido/'+`${id}`,{headers:  this.httpHeaders});
   /* return this._http.get(this.url + 'partido/'+`${id}`,{headers:  this.agregarAuthorizationHeader()}).pipe(
      map(response => response as Partidos)
    );*/
  }
   
    
   register(partido): Observable<any> { 
    this.agregarAuthorizationHeader();
     console.log(partido);
    return this._http.post<any>(this.url+'partido', partido, {headers:  this.httpHeaders});
   }

  
  registerMarcador(id,goles_visitante: number, goles_local: number):Observable<any> {
    this.agregarAuthorizationHeader();
    return this._http.put<any>(this.url + 'partido/'+`${id}`, {goles_visitante: goles_visitante,goles_local: goles_local}, {headers:  this.httpHeaders});
      
    }
  
}
