import { Equipo } from "./equipo";

export class PartidoDAO{
    usuario:number;
    local:Equipo;
    visitante:Equipo;
    fecha:String;
    goles_local:number;
    goles_visitante:number;
    
    constructor(usuario,local,visitante, fecha, goles_local, goles_visitante){
        this.usuario = usuario;
        this.local = local;
        this.visitante = visitante;
        this.fecha = fecha;
        this.goles_local = goles_local
        this.goles_visitante = goles_visitante;
    }
}