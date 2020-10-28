import { TipoUsuario } from '../enumClases/tipo-usuario';
import { Usuario } from './usuario';

export class Profecional extends Usuario{
  public especialidad: string;
  // public email: string;
  // public tipoUsuario: TipoUsuario;

  constructor(nombre: string, apellido: string, email: string, especialidad: string)
  {
    super(nombre, apellido, email, TipoUsuario.Paciente);
    this.especialidad = especialidad;
  }
}
