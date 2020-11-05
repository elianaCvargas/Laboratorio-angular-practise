import { getLocaleExtraDayPeriodRules } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Documento } from 'src/app/clases/documento';
import { Especialidad } from 'src/app/clases/especialidad';
import { Horario } from 'src/app/clases/horario';
import { Profesional } from 'src/app/clases/profesional';
import { Turnos } from 'src/app/clases/turnos';
import { HorarioService } from 'src/app/servicios/horario.service';
import { ProfesionalService } from 'src/app/servicios/profesional.service';
import { TurnosService } from 'src/app/servicios/turnos.service';

@Component({
  selector: 'app-alta-turno',
  templateUrl: './alta-turno.component.html',
  styleUrls: ['./alta-turno.component.scss']
})
export class AltaTurnoComponent implements OnInit {
  turnoGroup: FormGroup;
  public nombreCompleto: string;
  public especialidadSeleccionada: string;
  public especialidadesCombo: Array<Documento<Especialidad>>
  public profesionales: Array<Documento<Profesional>>;
  public horarios: Array<Documento<Horario>>;
  public email: string;
  public turnos: Array<Turnos>;
  displayedColumns: string[] = ['profesional', 'fecha', 'hora'];


  constructor(public builder: FormBuilder, private turnosService: TurnosService, private profesionalService: ProfesionalService
    , private horarioService: HorarioService, private turnoService: TurnosService) {
    // this.turnoGroup = this.builder.group({
    //   profesional: [null, Validators.required],
    //   fecha: [null, Validators.required],
    //   diaHora: [null, Validators.required],
    //   Especialidad: [null, Validators.required],
    // });
  }

  ngOnInit(): void {
    this.nombreCompleto = localStorage.getItem("nombre") + " " + localStorage.getItem("apellido");
    this.email = localStorage.getItem("email");
    this.turnosService.getAllEspecialidades().subscribe(
      (data) => { this.especialidadesCombo = data },
      (error) => { console.log(error)}
    );
  }

  agregarTurno() {

  }

  buscarProfesional(especialidad)
  {
      this.profesionalService.getAllProfesionalesByEspecialidad(especialidad.value.data.tipoEspecialidad)
      .subscribe((profesionales) => {
        for (let i = 0; i < profesionales.length; i++) {
          const profesional = profesionales[i].data;
          this.horarioService.getHorariosByEmail("profesional", profesional.email)
          .subscribe((horarios: Documento<Horario>[]) => {
              this.turnosService.getAllTurnosByApellidoProfesional(profesional.apellido)
              .subscribe((turnos: Documento<Turnos>[]) => {
                const turnosDisponibles = this.crearTurnosDisponibles(turnos, horarios);
                this.turnos = turnosDisponibles.map(turnosDisponible => {
                 return new Turnos(
                    profesional.email,
                    this.email,
                    turnosDisponible.hora,
                    turnosDisponible.fecha,
                    profesional.apellido
                  );
                });
              });
          },

          (error) => console.log(error));

        }

      }
      , (error) => console.log(error));
  }

  crearTurnosDisponibles(turnos: Documento<Turnos>[], horarios: Documento<Horario>[]): Array<{fecha: string, hora: string}> {
    const turnosDisponibles = [];
    for (const horario of horarios) {
      if(horario.data.rango[0]) {
        const horasTurno = this.getTurnosEntreHoras(8, 13);
        for (const horaTurno of horasTurno) {
          if(!turnos.find(x => x.data.hora == horaTurno)) {
            turnosDisponibles.push({
              fecha: horario.data.fecha,
              hora: horaTurno
            });
          }
        }
      }
    }

    return turnosDisponibles;
  }

  getTurnosEntreHoras(hora1: number, hora2: number): Array<string> {
    const turnos = [];
    for (let i = hora1; i < hora2; i+=0.5) {
      const horaString = i < 10 ? i.toString() : '0' + i.toString();
      const minutoString = i.toString()[2] == '5' ? '30' : '00';
      turnos.push(`"${horaString}:${minutoString}"`);
    }

    return turnos;
  }



  // buscarHorariosPorProfesional(email: string)
  // {
  //     this.
  // }
}
