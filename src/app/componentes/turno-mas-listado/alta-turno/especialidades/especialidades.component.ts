import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Documento } from 'src/app/clases/documento';
import { Especialidad } from 'src/app/clases/especialidad';

@Component({
  selector: 'app-especialidades',
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.scss']
})
export class EspecialidadesComponent implements OnInit {
  @Input() listado: Array<Documento<Especialidad>>;
  @Output() buscarProfesionalPorEspecialidad: EventEmitter<Documento<Especialidad>> = new EventEmitter();
  constructor() {
  }

  ngOnInit() {

  }

  buscarProfesionalesPorEspecialidad(especialidad: Documento<Especialidad>) {
    this.buscarProfesionalPorEspecialidad.emit(especialidad);
  }




}
