export enum TipoEspecialidad{
  Cirugia = 0,
  Dentista = 1,
  Oculista = 2,
  Otro = 3
}

export const TipoEspecialidadLabels = new Map<number, string>([
  [TipoEspecialidad.Oculista, 'Oculista'],
  [TipoEspecialidad.Dentista, 'Dentista'],
  [TipoEspecialidad.Cirugia, 'Cirugia']
]);

