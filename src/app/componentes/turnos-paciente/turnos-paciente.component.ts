import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Turnos } from 'src/app/clases/turnos';
import { EstadoTurno, EstadoTurnoLabels } from 'src/app/enumClases/estado-turno';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { CartelInformeComponent } from '../common/cartel-informe/cartel-informe.component';
import { AvisoDialogModel } from '../common/tarjetas/tarjeta/detalle-tarjeta/detalle-tarjeta.component';

let TURNOS_DATA: { id: string; data: Turnos; }[] = [
  {
    id: "A000001",
    data: {paciente: "paciente@mail.com", profesional: "profesional@mail.com", diaHora: "20/10/20", estado: 1, reseniaProfesional: "Pendiente", reseniaPaciente: "Pendiente Pendiente Pendiente Pendiente Pendiente Pendiente Pendiente Pendiente Pendiente Pendiente Pendiente Pendiente Pendiente "}
  },
  {
    id: "A000002",
    data: {paciente: "paciente@mail.com", profesional: "profesional@mail.com", diaHora: "20/10/20", estado: 1, reseniaProfesional: "Pendiente", reseniaPaciente: "Pendiente Pendiente Pendiente Pendiente Pendiente Pendiente Pendiente Pendiente Pendiente Pendiente Pendiente Pendiente Pendiente "}
  },
  {
    id: "C000003",
    data: {paciente: "paciente@mail.com", profesional: "profesional@mail.com", diaHora: "20/10/20", estado: 1, reseniaProfesional: "Pendiente", reseniaPaciente: "Pendiente Pendiente Pendiente Pendiente Pendiente Pendiente Pendiente Pendiente Pendiente Pendiente Pendiente Pendiente Pendiente "}
  },
  {
    id: "A000004",
    data: {paciente: "paciente@mail.com", profesional: "profesional@mail.com", diaHora: "20/10/20", estado: 1, reseniaProfesional: "Pendiente", reseniaPaciente: "Pendiente Pendiente Pendiente Pendiente Pendiente Pendiente Pendiente Pendiente Pendiente Pendiente Pendiente Pendiente Pendiente "}
  },
  {
    id: "D000005",
    data: {paciente: "paciente@mail.com", profesional: "profesional@mail.com", diaHora: "20/10/20", estado: 1, reseniaProfesional: "Pendiente", reseniaPaciente: "Pendiente Pendiente Pendiente Pendiente Pendiente Pendiente Pendiente Pendiente Pendiente Pendiente Pendiente Pendiente Pendiente "}
  }
];

@Component({
  selector: 'app-turnos-paciente',
  templateUrl: './turnos-paciente.component.html',
  styleUrls: ['./turnos-paciente.component.scss']
})

export class TurnosPacienteComponent implements OnInit {
  public estadoTurno: EstadoTurno;
  public estadoTurnosLabel = EstadoTurnoLabels;

  displayedColumns: string[] = ['profesional', 'paciente', 'diaHora', 'estado', 'reseniaProfesional', 'reseniaPaciente', 'confirmar'];
  dataSource = new MatTableDataSource<Turnos>(TURNOS_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private turnosService: TurnosService,
  ) {
      this.refresh();
   }

  ngOnInit(): void {
    this.getTurnosDePaciente("carla.e.vargas@gmail.com");
  }

  public getTurnosDePaciente(paciente: string): void {
    this.turnosService
      .getTurnosDePaciente("carla.e.vargas@gmail.com")
      .subscribe((data) => {
        // data.forEach((turno) => {
        //   TURNOS_DATA.push(turno);
        // });
        TURNOS_DATA = data;
        this.refresh(TURNOS_DATA);
        // this.showSuccess("Turnos cargados con éxito! " + data.length);
      }, (error) => {
        // this.showError(error);
      });
  }

  refresh(listado: Turnos[] = []) {
    this.dataSource = new MatTableDataSource(listado);
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  mostrarResenia(resenia: string)
  {
    this.showSuccess(resenia);
  }

  confirmarTurno(){
    this.showSuccess("Accion confirmar turno");
  }

  public showSuccess(success: string): void {
    const dialogData = new AvisoDialogModel('Información', success);
    this.dialog.open(CartelInformeComponent, {
      maxWidth: '400px',
      data: dialogData,
    });
  }
}


// @Component({
//   selector: 'app-estadistica-tabla',
//   templateUrl: './estadistica-tabla.component.html',
//   styleUrls: ['./estadistica-tabla.component.scss']
// })
// export class EstadisticaTablaComponent implements OnInit {
//   displayedColumns: string[] = ['nombre','cantGanados', 'cantPerdidos'];
//   dataSource: MatTableDataSource<EstadisticaJugador>;
//   @ViewChild(MatPaginator) paginator: MatPaginator;
//   public listado;
//   constructor(private jugadorService: JuegoServiceService) {
//     this.refresh();
//   }

//   ngOnInit() {
//     const email = localStorage.getItem('email');
//     this.jugadorService.getEstadisticaByEmail(email).subscribe(
//       (data) => {
//         let results = data.map(doc => doc.data);
//         this.refresh(results);
//       });
//   }

//   refresh(listado: EstadisticaJugador[] = []) {
//     this.dataSource = new MatTableDataSource(listado);
//     this.dataSource.paginator = this.paginator;
//   }

//   ngAfterViewInit() {
//     this.dataSource.paginator = this.paginator;
//   }
// }
