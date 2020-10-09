import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Pelicula } from 'src/app/clases/pelicula';

@Component({
  selector: 'app-tabla-pelicula',
  templateUrl: './tabla-pelicula.component.html',
  styleUrls: ['./tabla-pelicula.component.scss']
})
export class TablaPeliculaComponent implements OnInit {

  @Input() listado: any [];
  // = [{"titulo": "peli", "tipo": "tipo", "fecha": "asd", "foto": "peli2", "cantidad": "peli2"}];

  // public ruta = "https://i.ytimg.com/vi/AUth7BNIOx0/maxresdefault.jpg";

  displayedColumns: string[] = ['titulo', 'tipo', 'fecha', 'foto'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {
    this.refresh();
  }

  ngOnInit() {

  }

  refresh() {

  }

  ver() {
    console.log('' + this.listado);
  }

  ngAfterViewInit() {
  }

}
