import { TipoEspecialidad } from '../enumClases/especialidad-profesional';
import { TipoUsuario } from '../enumClases/tipo-usuario';
import { Usuario } from './usuario';

export class Administrador extends Usuario{

  constructor(nombre: string, apellido: string, email: string, password: string)
  {
    super(nombre, apellido, email, TipoUsuario.Administrador, password);
  }
}
