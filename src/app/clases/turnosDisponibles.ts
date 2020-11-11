import { EstadoTurno } from '../enumClases/estado-turno';

export class TurnosDisponibles {

  public horas: Array<string>;
  public dia: number;
  public mes: number;

  constructor(
  ) {
    this.horas = new Array<string>();
  }
}
