export enum TipoUsuario{
  Profesional = 0,
  Paciente = 1,
  Administrador = 2,
  Otro = 3
}

export const TipoUsuarioLabels = new Map<number, string>([
  [TipoUsuario.Administrador, 'Administrador'],
  [TipoUsuario.Paciente, 'Paciente'],
  [TipoUsuario.Profesional, 'Profesional']
]);
