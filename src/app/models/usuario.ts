export class Usuario{
    public nombre:String;
    public correo:String;
    public username:String;
    public password:String;
     
    constructor(nombre,correo,username, password){
        this.nombre = nombre;
        this.correo = correo;
        this.username = username;
        this.password = password;
    }
}