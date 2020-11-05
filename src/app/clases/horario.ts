import { DateFilterFn } from '@angular/material/datepicker';

export class Horario {
  public profesional: string;
  public fechaDate: Date;
  public fecha: any;
  public rango: Array<boolean> = [false, false, false];
  public maniana: string;
  public tarde: string;
  public noche: string;
  constructor(date: Date) {
    this.fecha = date;
  }
}
