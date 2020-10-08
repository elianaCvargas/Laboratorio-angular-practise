import { TipoPelicula } from '../enumClases/tipoPelicula';


export class Pelicula{

  public id: number;
  public nombre: string;
  public tipo: TipoPelicula;
  public fechaEstreno: Date;
  public cantidadPublico: number;
  public fotoPelicula: string;

  constructor(nombre: string, tipo: TipoPelicula, fecha: Date, cantPublico: number, foto: string)
  {
    this.nombre =  nombre;
    this.tipo = tipo;
    this.fechaEstreno = fecha;
    this.cantidadPublico = cantPublico;
    this.fotoPelicula = foto;
  }
}
