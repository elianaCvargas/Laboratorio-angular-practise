import { EstadoTurno } from '../enumClases/estado-turno';

export class Turnos {
  public profesional: string;
  public apellido: string;
  public paciente: string;
  public hora: string;
  public fecha: string;
  public estado: EstadoTurno;
  public reseniaProfesional: string;
  public reseniaPaciente: string;

  constructor(
    profesional: string,
    paciente: string,
    hora: string,

    fecha: string,
    apellido: string
  ) {
    this.profesional = profesional;
    this.paciente = paciente;
    this.hora = hora;
    this.estado = EstadoTurno.Pendiente;
    this.reseniaProfesional = "";
    this.reseniaPaciente = "";
    this.fecha = fecha;
    this.apellido= apellido;
  }
}
