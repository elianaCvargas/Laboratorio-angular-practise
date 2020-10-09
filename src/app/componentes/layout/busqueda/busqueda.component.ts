import { Component, OnInit } from '@angular/core';
import { Pelicula } from 'src/app/clases/pelicula';
import { TipoPelicula } from 'src/app/enumClases/tipoPelicula';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss']
})
export class BusquedaComponent implements OnInit {
  public verComoTabla: boolean = true;

  listadoRecibido: Pelicula[]  = [
    {"id": 1, "nombre": "peli", "tipo": TipoPelicula.Terror, "fechaEstreno": new Date('2020-08-01'), "fotoPelicula": "peli2", "cantidadPublico": 100}
  , {"id": 2, "nombre": "peli", "tipo": TipoPelicula.Romance, "fechaEstreno": new Date('2020-08-01'), "fotoPelicula": "peli2", "cantidadPublico": 100}
  , {"id": 3, "nombre": "peli", "tipo": TipoPelicula.Romance, "fechaEstreno": new Date('2020-08-01'), "fotoPelicula": "peli2", "cantidadPublico": 100}
  , {"id": 4, "nombre": "peli", "tipo": TipoPelicula.Romance, "fechaEstreno": new Date('2020-08-01'), "fotoPelicula": "peli2", "cantidadPublico": 100}];
  constructor() { }

  ngOnInit(): void {
  }

  public toogleVista(): void {
    this.verComoTabla = !this.verComoTabla;
  }
}
