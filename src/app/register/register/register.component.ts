import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Usuario } from '../../models/usuario';
import { GLOBAL } from '../../services/global';
import { UsuarioService } from '../../services/usuario.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UsuarioService]
})
export class RegisterComponent implements OnInit {
  public title: String;
  public usuario:Usuario;
  public mensaje:String;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _usuarioService: UsuarioService
  ) { 
  
    this.title = "Registrar Usuarios";
    this.usuario = new Usuario('','','','')
  }

  ngOnInit(): void {
    console.log("Componente Cargado"); 
  }
   
  onRegistrar(formRegister){
    //console.log(this.usuario);
    this._usuarioService.register(this.usuario).subscribe(
      data=>{
        if(data){
          console.log(data);
          this.mensaje ="El Registro se Ha Realizado Correctamente...";
          this.usuario = new Usuario('','','','');
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
