import { Component } from '@angular/core';
import { UsuarioService } from './services/usuario.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FronEndPartidosUNAB';
  constructor(public usuarioService:UsuarioService, private _router:Router){

  }
  public logaedo: boolean;
  logout():void {
    this.usuarioService.logout();
    swal.fire("Logout", "Ha Cerrado Sesion con Exito","success");
    this._router.navigate(['login'])
  }
  public logIn(): boolean {
    console.log(localStorage.getItem('auth_token'));
    if(localStorage.getItem('auth_token') == null){
      return false;
    }
    return true;
  }
}
