import { Component, Input, OnInit } from '@angular/core';
import { Pais } from 'src/app/clases/pais';

@Component({
  selector: 'app-detalle-pais',
  templateUrl: './detalle-pais.component.html',
  styleUrls: ['./detalle-pais.component.scss']
})
export class DetallePaisComponent implements OnInit {
   @Input() tarjeta: Pais;
  // tarjeta:Pais;

  constructor() { }

  ngOnInit(): void {
  }

  // tomarPais(pais:Pais)
  // {
  //   this.tarjeta = pais;
  // }
}
