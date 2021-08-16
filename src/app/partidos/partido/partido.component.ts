import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router'; 
import { Partidos } from 'src/app/models/partidos';
import { UsuarioService } from '../../services/usuario.service';
import { ConsultapartidoService } from 'src/app/services/consultapartido.service';
@Component({
  selector: 'app-partido',
  templateUrl: './partido.component.html',
  styleUrls: ['./partido.component.css']
})
export class PartidoComponent implements OnInit {
  public partidos:Partidos[];
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _usuarioService: UsuarioService,
    private partidoService: ConsultapartidoService) { }

  ngOnInit(): void {
     
    if(!this._usuarioService.esAutenticado()){
      this._router.navigate(['login']);
    }else{
      this.partidoService.getPartidos().subscribe(data => (this.partidos=data));
    }
  }

}
