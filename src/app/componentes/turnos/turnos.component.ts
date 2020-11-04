import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Documento } from 'src/app/clases/documento';
import { Turnos } from 'src/app/clases/turnos';
import { EstadoTurno, EstadoTurnoLabels } from 'src/app/enumClases/estado-turno';
import { TipoUsuario, TipoUsuarioLabels } from 'src/app/enumClases/tipo-usuario';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { CartelInformeComponent } from '../common/cartel-informe/cartel-informe.component';
import { CartelInputComponent, InputDialogModel } from '../common/cartel-input-informe/cartel-input-informe.component';
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

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.scss']
})

export class TurnosComponent implements OnInit {
  @Input() listado: any [];
  dataSource: MatTableDataSource<Turnos>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public estadoTurno = EstadoTurno;
  public estadoTurnosLabel = EstadoTurnoLabels;
  public tipoUsuarioLogged = localStorage.getItem("tipoUsuario");
  public tipoUsuario = TipoUsuario;
  public tipoUsuarioLabels = TipoUsuarioLabels;

  displayedColumns: string[] = ['profesional', 'paciente', 'diaHora', 'estado', 'reseniaProfesional', 'reseniaPaciente', 'confirmar'];
  // dataSource = new MatTableDataSource<Documento<Turnos>>(TURNOS_DATA);
  // @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private turnosService: TurnosService,
  ) {
      this.refresh();
   }

  ngOnInit(): void {
    // var email = localStorage.getItem("email");
    // if(email == undefined || email == null)
    // {

    // }
    // this.getTurnosDePaciente("carla.e.vargas@gmail.com");
  }

  // public getTurnosDePaciente(paciente: string): void {
  //   this.turnosService
  //     .getTurnosDePaciente("carla.e.vargas@gmail.com")
  //     .subscribe((data) => {
  //       // data.forEach((turno) => {
  //       //   TURNOS_DATA.push(turno);
  //       // });
  //       TURNOS_DATA = data;
  //       this.refresh(TURNOS_DATA);
  //       // this.showSuccess("Turnos cargados con éxito! " + data.length);
  //     }, (error) => {
  //       // this.showError(error);
  //     });
  // }

  refresh() {
    this.dataSource = new MatTableDataSource(this.listado);
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

  rechazarTurno(id: string){
    this.actualizarEstadoTurno(id, this.estadoTurno.Rechazado);
  }

  cancelarTurno(id: string){
    this.actualizarEstadoTurno(id, this.estadoTurno.Cancelado);
  }

  actualizarEstadoTurno(id: string, nuevoEstado: EstadoTurno): void{
    const turno = TURNOS_DATA.find(element => element.id === id);
    turno.data.estado = nuevoEstado;
    this.turnosService.updateRegistroTurnoById(turno);

    this.showSuccess("Accion confirmar turno de " + id);
    // this.refresh(TURNOS_DATA);
  }

  actualizarResenia(id: string, nuevoEstado: EstadoTurno): void{
    const turno = TURNOS_DATA.find(element => element.id === id);
    turno.data.estado = nuevoEstado;
    this.turnosService.updateRegistroTurnoById(turno);

    this.showSuccess("Accion confirmar turno de " + id);
    // this.refresh(TURNOS_DATA);
  }

  public showSuccess(success: string): void {
    const dialogData = new AvisoDialogModel('Información', success);
    this.dialog.open(CartelInformeComponent, {
      maxWidth: '400px',
      data: dialogData,
    });
  }

  public inputResenia(id: string): void {
    const dialogData = new InputDialogModel('Ingresar Comentario', TURNOS_DATA.find(element => element.id === id));
    const turno = TURNOS_DATA.find(element => element.id === id);
    this.dialog.open(CartelInputComponent, {
      maxWidth: '800px',
      minWidth: '400px',
      data: dialogData,
    });
  }

}
