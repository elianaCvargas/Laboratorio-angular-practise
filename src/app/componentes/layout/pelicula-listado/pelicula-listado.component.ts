import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pelicula-listado',
  templateUrl: './pelicula-listado.component.html',
  styleUrls: ['./pelicula-listado.component.scss']
})
export class PeliculaListadoComponent implements OnInit {
public ruta = "https://i.ytimg.com/vi/AUth7BNIOx0/maxresdefault.jpg";
  constructor() { }

  ngOnInit(): void {
  }

}
