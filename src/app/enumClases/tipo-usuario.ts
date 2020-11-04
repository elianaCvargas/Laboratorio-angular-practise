export enum TipoUsuario{
  Profesional = 0,
  Paciente = 1,
  Administrador = 2
}

export const TipoUsuarioLabels = new Map<number, string>([
  [TipoUsuario.Profesional, 'Profesional'],
  [TipoUsuario.Paciente, 'Paciente'],
  [TipoUsuario.Administrador, 'Administrador']
]);
