import { Component, Input, OnInit } from '@angular/core';
import { Documento } from 'src/app/clases/documento';
import { Profesional } from 'src/app/clases/profesional';

@Component({
  selector: 'app-profesionales',
  templateUrl: './profesionales.component.html',
  styleUrls: ['./profesionales.component.scss']
})
export class ProfesionalesComponent implements OnInit {
  @Input() listado: Array<Documento<Profesional>>;

  constructor() { }

  ngOnInit(): void {
  }

}
