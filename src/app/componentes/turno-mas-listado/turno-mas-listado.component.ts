import { Component, OnInit, ViewChild } from '@angular/core';
import { Documento } from 'src/app/clases/documento';
import { Turnos } from 'src/app/clases/turnos';
import { TurnosComponent } from '../turnos/turnos.component';

@Component({
  selector: 'app-turno-mas-listado',
  templateUrl: './turno-mas-listado.component.html',
  styleUrls: ['./turno-mas-listado.component.scss']
})
export class TurnoMasListadoComponent implements OnInit {
  public listadoParaCompartir: Array<Documento<Turnos>>;
    @ViewChild('listadoResultados') listadoResultados: TurnosComponent;
  constructor() { }

  ngOnInit(): void {
  }

}
