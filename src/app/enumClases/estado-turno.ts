export enum EstadoTurno{
  Pendiente = 0,
  Confirmado = 1,
  Rechazado = 2,
  Cancelado = 3
}

export const EstadoTurnoLabels = new Map<number, string>([
  [EstadoTurno.Pendiente, 'Pendiente'],
  [EstadoTurno.Confirmado, 'Confirmado'],
  [EstadoTurno.Rechazado, 'Rechazado'],
  [EstadoTurno.Cancelado, 'Cancelado']
]);
