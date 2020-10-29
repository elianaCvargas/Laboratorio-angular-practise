import { EstadoTurno } from '../enumClases/estado-turno';

export class Turnos {
  public profesional: string;
  public paciente: string;
  public diaHora: string;
  public estado: EstadoTurno;
  public reseniaProfesional: string;
  public reseniaPaciente: string;

  constructor(
    profesional: string,
    paciente: string,
    diaHora: string,
    estado: EstadoTurno,
    reseniaProfesional: string,
    reseniaPaciente: string
  )
  {
    this.profesional = profesional;
    this.paciente = paciente;
    this.diaHora = diaHora;
    this.estado = estado;
    this.reseniaProfesional = reseniaProfesional;
    this.reseniaPaciente = reseniaPaciente;
  }
}
