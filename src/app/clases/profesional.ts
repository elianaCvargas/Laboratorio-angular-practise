import { TipoEspecialidad } from '../enumClases/especialidad-profesional';
import { TipoUsuario } from '../enumClases/tipo-usuario';
import { Usuario } from './usuario';

export class Profesional extends Usuario{
  public especialidad: TipoEspecialidad[];
  public habilitado: boolean;

  constructor(nombre: string, apellido: string, email: string, especialidad: TipoEspecialidad[], password: string)
  {
    super(nombre, apellido, email, TipoUsuario.Profesional, password);
    this.especialidad = especialidad;
    this.habilitado = false;
  }
}
