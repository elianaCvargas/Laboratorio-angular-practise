import { getLocaleExtraDayPeriodRules } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Documento } from 'src/app/clases/documento';
import { Especialidad } from 'src/app/clases/especialidad';
import { Horario } from 'src/app/clases/horario';
import { Profesional } from 'src/app/clases/profesional';
import { Turnos } from 'src/app/clases/turnos';
import { TurnosDisponibles } from 'src/app/clases/turnosDisponibles';
import { EspecialidadesService } from 'src/app/servicios/especialidades.service';
import { HorarioService } from 'src/app/servicios/horario.service';
import { ProfesionalService } from 'src/app/servicios/profesional.service';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { EspecialidadesComponent } from './especialidades/especialidades.component';
import { ProfesionalesComponent } from './profesionales/profesionales.component';

@Component({
  selector: 'app-alta-turno',
  templateUrl: './alta-turno.component.html',
  styleUrls: ['./alta-turno.component.scss'],
})
export class AltaTurnoComponent implements OnInit {
  turnoGroup: FormGroup;
  public nombreCompleto: string;
  public especialidadSeleccionada: string;
  // public especialidadesCombo: Array<Documento<Especialidad>>
  public profesionalSeleccionado: string;
  public profesionalesCombo: Array<Documento<Profesional>>;

  public profesionales: Array<Documento<Profesional>>;
  public horarios: Array<Documento<Horario>>;
  public email: string;
  public turnosDisponibles: Array<TurnosDisponibles>;

  //lo uso para compartir
  public turnos: Array<Turnos> = [];

  dataSource: MatTableDataSource<Turnos>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['profesional', 'fecha', 'hora'];

  public especialidadesParaCompartir: Array<Documento<Especialidad>>;

  public profesionalesParaCompartir: Array<Documento<Profesional>> = [];
  public turnosParaCompartir: Array<Turnos> = [];

  constructor(
    public builder: FormBuilder,
    private turnosService: TurnosService,
    private profesionalService: ProfesionalService,
    private horarioService: HorarioService,
    private especialidadService: EspecialidadesService
  ) {
    this.especialidadesParaCompartir = new Array<Documento<Especialidad>>();
    this.turnosDisponibles = new Array<TurnosDisponibles>();
    // this.turnoGroup = this.builder.group({
    //   profesional: [null, Validators.required],
    //   fecha: [null, Validators.required],
    //   diaHora: [null, Validators.required],
    //   Especialidad: [null, Validators.required],
    // });
  }

  ngOnInit(): void {
    this.nombreCompleto =
      localStorage.getItem('nombre') + ' ' + localStorage.getItem('apellido');
    this.email = localStorage.getItem('email');
    this.especialidadService.getAllEspecialidades().subscribe(
      (data) => {
        this.especialidadesParaCompartir = data;
      },
      (error) => {
        console.log(error);
      }
    );
    // this.refresh();
  }

  agregarTurno() {}

  buscarProfesional(especialidad) {
    var especialidadNumber = parseInt(especialidad.data.tipoEspecialidad);
    //obtengo todos los profesionales que haya por especialidad
    this.profesionalService
      .getAllProfesionalesByEspecialidad(especialidadNumber)
      .subscribe(
        (profesionales) => {
          this.profesionalesParaCompartir = profesionales;

          for (let i = 0; i < profesionales.length; i++) {
            const profesional = profesionales[i].data;
            //Ya tengo los profesionales con la especialidad seleccionada
            this.horarioService
              .getHorariosByEmail(profesional.email, 'profesional')
              .subscribe(
                (horarios: Documento<Horario>[]) => {
                  //obtengo los horarios cargados de los  profesional
                  this.turnosService
                    .getAllTurnosByApellidoProfesional(profesional.apellido)
                    .subscribe((turnos: Documento<Turnos>[]) => {
                      const turnosDisponibles = this.crearTurnosDisponibles(
                        turnos,
                        horarios
                      );

                      // turnosDisponibles.forEach((turno) => {
                      //   this.turnos.push(
                      //     new Turnos(
                      //       profesional.email,
                      //       this.email,
                      //       turno.hora,
                      //       turno.fecha,
                      //       profesional.apellido
                      //     )
                      //   );
                      // });
                      this.armarTurnosHasta15Dias(turnosDisponibles);
                      this.refresh();
                    });
                },

                (error) => console.log(error)
              );
          }
        },
        (error) => console.log(error)
      );
  }

  crearTurnosDisponibles(
    turnos: Documento<Turnos>[],
    horarios: Documento<Horario>[]
  ): Array<string> {
    const turnosDisponibles = [];
    for (const horario of horarios) {
      if (horario.data.rango[0]) {
        const horasTurno = this.getTurnosEntreHoras(8, 13);
        for (const horaTurno of horasTurno) {
          if (!turnos.find((x) => x.data.hora == horaTurno)) {

            // turnosDisponibles.push({
            //   hora: horaTurno,
            // });
            turnosDisponibles.push(horaTurno);
          }
        }
      }
    }

    return turnosDisponibles;
  }

  crearTurnosDisponibleJave(
    turnos: Documento<Turnos>[],
    horarios: Documento<Horario>[]
  ): Array<{ fecha: string; hora: string }> {
    const turnosDisponibles = [];
    for (const horario of horarios) {
      if (horario.data.rango[0]) {
        const horasTurno = this.getTurnosEntreHoras(8, 13);
        for (const horaTurno of horasTurno) {
          if (!turnos.find((x) => x.data.hora == horaTurno)) {

            turnosDisponibles.push({
              hora: horaTurno,
            });
          }
        }
      }
    }

    return turnosDisponibles;
  }

  getTurnosEntreHoras(hora1: number, hora2: number): Array<string> {
    const turnos = [];
    for (let i = hora1; i < hora2; i++) {
      turnos.push(`${i}:00`);
      turnos.push(`${i}:30`);
    }

    return turnos;
  }

  refresh() {
    this.turnosParaCompartir = this.turnos;
  }

  armarTurnosHasta15Dias(horas: Array<string>)
  {
    const diasAagregar = 15;
    var fechaActual = new Date();
    var hoy = new Date();
    var fechaSiguiente = new Date(fechaActual.setDate(fechaActual.getDate() + diasAagregar));
    for (let i = hoy; i <= fechaSiguiente; i.setDate(i.getDate() + 1)) {
      console.log(i);
      // this.turnosDisponibles.push(
      //   new TurnosDisponibles()
      //   {
      //     dia =
      //   }
      // );

    }


  }
}
