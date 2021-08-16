import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs'; 
import { Partidos } from 'src/app/models/partidos';
import { Equipo } from 'src/app/models/equipo';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ConsultaequipoService } from 'src/app/services/consultaequipo.service';
import { ConsultapartidoService } from 'src/app/services/consultapartido.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [ConsultaequipoService, ConsultapartidoService]
})
export class FormComponent implements OnInit {
  public title: String;
  public partido:Partidos;
  
  public mensaje:String;
  public equipos:Equipo[];
  constructor(private equipoService: ConsultaequipoService,
              private partidoService: ConsultapartidoService,
              private usuarioService: UsuarioService,
              private _router: Router,) { 
      
                this.partido = new Partidos('','','','','','');
    
  }
  getEquipos():Observable<Equipo[]>{
    return of(this.equipos);
  }

  ngOnInit(): void {
    if(!this.usuarioService.esAutenticado()){
      this._router.navigate(['login']);
    } 
    this.equipoService.getEquipos().subscribe(data => (this.equipos=data));
    console.log(this.equipos);
     
    console.log(this.equipos);
  }

  onRegistrar(formRegister){
    console.log(this.partido);
    if(this.partido.local == this.partido.visitante){
      alert("No Puede Seleccionar el Mismo Equipo");
      return;
    }
    if(this.partido.fecha == "" || String(this.partido.local) ==""  || String(this.partido.visitante) ==""){
      alert("Debe Digitar Los datos completos");
      return;
    }
    this.partido.usuario = parseInt(this.usuarioService.idUsuario);
    
    this.partidoService.register(this.partido).subscribe(
      data=>{
        if(data){
          console.log(data);
          this.mensaje ="El Partido se Ha Registrado Correctamente...";
          this.partido = new Partidos(0,0,0,'',0,0);
          alert(this.mensaje);
          formRegister.reset()
        }else{
         this.mensaje ="Error al Registrar Usuario";
       
        }
        console.log(this.mensaje);
      },
      error =>{
        console.log(<any>error);
      }
    );
  }

}
