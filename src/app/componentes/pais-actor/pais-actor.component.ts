import { Component, Input, OnInit } from '@angular/core';
import { Pais } from 'src/app/clases/pais';
import { AllServicesService } from 'src/app/servicios/all-services.service';

@Component({
  selector: 'app-pais-actor',
  templateUrl: './pais-actor.component.html',
  styleUrls: ['./pais-actor.component.scss']
})
export class PaisActorComponent implements OnInit {
  listadoRecibido: Pais[];

  constructor(private paisService: AllServicesService) {
    this.cargarUsuarios();
  }

  ngOnInit() {
    this.paisService.getPaises()
    .subscribe((data: Pais [] )=> {
      this.listadoRecibido = data;
    });
  }

  refresh() {

  }

  ver() {

  }

  ngAfterViewInit() {
  }

  cargarUsuarios()
  {
    this.paisService.getPaises()
    .subscribe((data: Pais [] )=> {
      this.listadoRecibido = data;
    });
  }
}
