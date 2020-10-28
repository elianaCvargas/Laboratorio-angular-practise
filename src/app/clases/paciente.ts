import { TipoUsuario } from '../enumClases/tipo-usuario';
import { Usuario } from './usuario';

export class Paciente extends Usuario{
  public imagenUno: string;
  public imagenDos: string;
  // public email: string;
  // public tipoUsuario: TipoUsuario;

  constructor(nombre: string, apellido: string, email: string, imagenUno: string, imagenDos:string)
  {
    super(nombre, apellido, email, TipoUsuario.Paciente);
    this.imagenUno = imagenUno;
    this.imagenDos = imagenDos;
    // this.email = email;
    // this.tipoUsuario = tipoUsuario;
  }
}
