export class Horario {
  public profesional: string;
  public fecha: Date;
  public rango: Array<boolean> = [false, false, false];
  public maniana: string;
  public tarde: string;
  public noche: string;
  constructor(date: Date) {
    this.fecha = date;
  }
}
