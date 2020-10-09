export enum TipoPelicula{
  Terror = 0,
  Comedia = 1,
  Romance = 2,
  Otros = 3
}
export const TipoPeliculaLabels = new Map<number, string>([
  [TipoPelicula.Terror, 'Terror'],
  [TipoPelicula.Comedia, 'Comedia'],
  [TipoPelicula.Romance, 'Romance'],
  [TipoPelicula.Otros, 'Otros']
]);
