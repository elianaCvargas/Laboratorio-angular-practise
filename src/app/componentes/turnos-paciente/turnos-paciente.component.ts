import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Documento } from 'src/app/clases/documento';
import { Turnos } from 'src/app/clases/turnos';
import { EstadoTurno, EstadoTurnoLabels } from 'src/app/enumClases/estado-turno';
import { TipoUsuario, TipoUsuarioLabels } from 'src/app/enumClases/tipo-usuario';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { CartelInformeComponent } from '../common/cartel-informe/cartel-informe.component';
<<<<<<< HEAD
import { CartelInputComponent, InputDialogModel } from '../common/cartel-input-informe/cartel-input-informe.component';
import { AvisoDialogModel } from '../common/tarjetas/tarjeta/detalle-tarjeta/detalle-tarjeta.component';

let TURNOS_DATA: Documento<Turnos>[] = [];
=======
import { AvisoDialogModel } from '../common/tarjetas/tarjeta/detalle-tarjeta/detalle-tarjeta.component';

let TURNOS_DATA: Documento<Turnos>[] = [
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
>>>>>>> ecc433021a27c7bed9d3dd4c9bb0442faa7a09ef

@Component({
  selector: 'app-turnos-paciente',
  templateUrl: './turnos-paciente.component.html',
  styleUrls: ['./turnos-paciente.component.scss']
})

export class TurnosPacienteComponent implements OnInit {
  public estadoTurno = EstadoTurno;
  public estadoTurnosLabel = EstadoTurnoLabels;
  public tipoUsuarioLogged = localStorage.getItem("tipoUsuario");
  public tipoUsuario = TipoUsuario;
  public tipoUsuarioLabels = TipoUsuarioLabels;
<<<<<<< HEAD

  displayedColumns: string[] = ['profesional', 'paciente', 'diaHora', 'estado', 'reseniaProfesional', 'reseniaPaciente', 'confirmar'];
  dataSource = new MatTableDataSource<Documento<Turnos>>(TURNOS_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;

=======

  displayedColumns: string[] = ['profesional', 'paciente', 'diaHora', 'estado', 'reseniaProfesional', 'reseniaPaciente', 'confirmar'];
  dataSource = new MatTableDataSource<Documento<Turnos>>(TURNOS_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;

>>>>>>> ecc433021a27c7bed9d3dd4c9bb0442faa7a09ef
  constructor(
    public dialog: MatDialog,
    private turnosService: TurnosService,
  ) {
      this.refresh();
   }

  ngOnInit(): void {
    this.getTurnosDePaciente("carla.e.vargas@gmail.com");
<<<<<<< HEAD
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

  refresh(listado: Documento<Turnos>[] = []) {
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

  confirmarTurno(id: string){
    this.actualizarEstadoTurno(id, this.estadoTurno.Confirmado);
  }

=======
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

  refresh(listado: Documento<Turnos>[] = []) {
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

  confirmarTurno(id: string){
    this.actualizarEstadoTurno(id, this.estadoTurno.Confirmado);
  }

>>>>>>> ecc433021a27c7bed9d3dd4c9bb0442faa7a09ef
  rechazarTurno(id: string){
    this.actualizarEstadoTurno(id, this.estadoTurno.Rechazado);
  }

  cancelarTurno(id: string){
    this.actualizarEstadoTurno(id, this.estadoTurno.Cancelado);
  }

  actualizarEstadoTurno(id: string, nuevoEstado: EstadoTurno): void{
    const turno = TURNOS_DATA.find(element => element.id === id);
    turno.data.estado = nuevoEstado;
<<<<<<< HEAD
    this.turnosService.updateRegistroTurnoById(turno);
=======
    this.turnosService.updateEstadoTurno(turno);
>>>>>>> ecc433021a27c7bed9d3dd4c9bb0442faa7a09ef

    this.showSuccess("Accion confirmar turno de " + id);
    this.refresh(TURNOS_DATA);
  }

  actualizarResenia(id: string, nuevoEstado: EstadoTurno): void{
    const turno = TURNOS_DATA.find(element => element.id === id);
    turno.data.estado = nuevoEstado;
<<<<<<< HEAD
    this.turnosService.updateRegistroTurnoById(turno);
=======
    this.turnosService.updateEstadoTurno(turno);
>>>>>>> ecc433021a27c7bed9d3dd4c9bb0442faa7a09ef

    this.showSuccess("Accion confirmar turno de " + id);
    this.refresh(TURNOS_DATA);
  }

  public showSuccess(success: string): void {
    const dialogData = new AvisoDialogModel('Información', success);
    this.dialog.open(CartelInformeComponent, {
      maxWidth: '400px',
      data: dialogData,
    });
  }
<<<<<<< HEAD

  public inputResenia(id: string): void {
    const dialogData = new InputDialogModel('Ingresar Comentario', TURNOS_DATA.find(element => element.id === id));
    const turno = TURNOS_DATA.find(element => element.id === id);
    this.dialog.open(CartelInputComponent, {
      maxWidth: '800px',
      minWidth: '400px',
      data: dialogData,
    });
  }
=======
>>>>>>> ecc433021a27c7bed9d3dd4c9bb0442faa7a09ef
}
