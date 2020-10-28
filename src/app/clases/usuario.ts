import { TipoUsuario } from '../enumClases/tipo-usuario';

export class Usuario {
  public nombre: string;
  public apellido: string;
  public email: string;
  public tipoUsuario: TipoUsuario;

  constructor(nombre: string, apellido: string, email: string, tipoUsuario: TipoUsuario)
  {
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.tipoUsuario = tipoUsuario;
  }
}
