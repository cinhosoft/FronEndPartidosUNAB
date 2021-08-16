import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { ILogin } from 'src/app/models/login'; 
import swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UsuarioService]
})
export class LoginComponent implements OnInit {
  public title: String;
  public usuario:Usuario;
  constructor( 
    private _route: ActivatedRoute,
    private _router: Router,
    private _usuarioService: UsuarioService
    ) { 
      this.usuario = new Usuario('','','','');
    }

  ngOnInit(): void {
    this.title = "Iniciar Sesion";
    console.log('Iniciar Sesion');
    if(this._usuarioService.esAutenticado()){
      this._router.navigate(['partido']);
    }else{
      this._router.navigate(['login']);
    }
    
  }
  onLogin2(formLogin){
    if(this.usuario.username == null || this.usuario.password == null){
      console.log("Error No digito datos");
      
    }
    console.log(this.usuario);
    this._usuarioService.login(this.usuario.username, this.usuario.password);
    //console.log(localStorage.getItem('auth_token'));

  }
  onLogin():void{
    if(this.usuario.username == null || this.usuario.password == null){
      console.log("Error No digito datos");
      swal.fire('Error!', 'Error No digito datos completos' , 'error');
    }
    console.log("Inicio Usuario")
    console.log(this.usuario);
    this._usuarioService.login(this.usuario.username, this.usuario.password).subscribe(response =>{
      //console.log(response);
      let payload = JSON.parse(atob(response.token.split(".")[1]));
      console.log(payload);
      this._router.navigate(['partido'])
      this._usuarioService.guardarToken(response.token);
      /*let idUsuario = payload.sub.split("|")[0];
      let nombreUsuario = payload.sub.split("|")[1];*/
      let nombreUsuario = response
      this._usuarioService.guardarUsuario(response.idUsuario,response.username);
      swal.fire('Login!', 'Hola: ' + response.username  + ', ha iniciado correctamente' , 'success');

    },error => {
      if(error.status == 401){
        swal.fire('Error Login!', 'Datos Digitados Son Incorrectos' , 'error');
      }
    }
    );
     

  }

}
