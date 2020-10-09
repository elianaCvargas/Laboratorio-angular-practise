import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Pelicula } from 'src/app/clases/pelicula';
import { DetalleTarjetaComponent } from './tarjeta/detalle-tarjeta/detalle-tarjeta.component';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.scss']
})
export class TarjetasComponent implements OnInit {
  @Input() tarjetas: Pelicula [];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  verDetalle(pelicula: Pelicula): void {
    const dialog = this.dialog.open(DetalleTarjetaComponent, {
      maxWidth: '400px',
      data: pelicula,
    });
  }
}
