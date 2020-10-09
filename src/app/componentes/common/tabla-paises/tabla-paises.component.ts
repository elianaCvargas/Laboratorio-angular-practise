import { Component, Input, OnInit } from '@angular/core';
import { Pais } from 'src/app/clases/pais';
import { AllServicesService } from 'src/app/servicios/all-services.service';

@Component({
  selector: 'app-tabla-paises',
  templateUrl: './tabla-paises.component.html',
  styleUrls: ['./tabla-paises.component.scss']
})
export class TablaPaisesComponent implements OnInit {

  @Input() listado: any [];


  displayedColumns: string[] = ['name', 'alpha2Code', 'capital', 'population', 'region', 'flag'];

  constructor(private paisService: AllServicesService) {
    this.cargarUsuarios();
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

  cargarUsuarios()
  {
    this.paisService.getPaises()
    .subscribe((data: Pais [] )=> {
      this.listado = data;
    });
  }
}
