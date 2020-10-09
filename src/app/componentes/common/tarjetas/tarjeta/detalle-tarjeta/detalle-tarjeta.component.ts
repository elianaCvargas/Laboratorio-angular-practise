import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pelicula } from 'src/app/clases/pelicula';
import { TipoPeliculaLabels } from 'src/app/enumClases/tipoPelicula';

@Component({
  selector: 'app-detalle-tarjeta',
  templateUrl: './detalle-tarjeta.component.html',
  styleUrls: ['./detalle-tarjeta.component.scss']
})
export class DetalleTarjetaComponent implements OnInit {
  public tipoPeliculaLabels = TipoPeliculaLabels;
  constructor(public dialogRef: MatDialogRef<DetalleTarjetaComponent>,
    @Inject(MAT_DIALOG_DATA) public pelicula: Pelicula) {

  }


  ngOnInit(): void {
  }

  onClose(): void {
    this.dialogRef.close();
  }
}

export class AvisoDialogModel {
  constructor(public title: string, public message: string) { }
}
