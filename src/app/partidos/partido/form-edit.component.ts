import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';  
import { PartidoDAO } from 'src/app/models/partidoDAO';
import { Equipo } from 'src/app/models/equipo';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ConsultaequipoService } from 'src/app/services/consultaequipo.service';
import { ConsultapartidoService } from 'src/app/services/consultapartido.service';
import { Router, ActivatedRoute } from '@angular/router'; 
@Component({
  selector: 'app-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.css']
})
export class FormEditComponent implements OnInit {

  public title: String;
  public partido:PartidoDAO;
  public resp:string;
  public mensaje:String;
  public equipos:Equipo[];
  public idPartido:String;
  constructor(private equipoService: ConsultaequipoService,
              private partidoService: ConsultapartidoService,
              private usuarioService: UsuarioService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { 
      
                this.partido = new PartidoDAO('','','','','','');
    
  }
  getEquipos():Observable<Equipo[]>{
    return of(this.equipos);
  }
  cargarPartido():void{
    this.activatedRoute.params.subscribe(params=>{
      let id = params['id'];
      
      if(id){
        this.idPartido = id;
        this.partidoService.getPartido(id).subscribe(
          (partido) => this.partido = partido
          
        );
      }
      
    }
      )
  }

  ngOnInit(): void {
    if(!this.usuarioService.esAutenticado()){
      this.router.navigate(['login']);
    } 
    this.cargarPartido();
    this.equipoService.getEquipos().subscribe(data => (this.equipos=data));
    console.log(this.equipos); 
  }

  onActualizar(formRegister){
    console.log(this.partido);
    this.partido.usuario = parseInt(this.usuarioService.idUsuario);
    
    this.partidoService.registerMarcador(this.idPartido,this.partido.goles_visitante, this.partido.goles_local).subscribe(
      data=>{
        if(data){
          console.log(data);
          this.router.navigate(['partido']);
          this.mensaje ="El Marcador se Ha Registrado Correctamente...";
          this.partido = new PartidoDAO(0,{},{},'',0,0);
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
