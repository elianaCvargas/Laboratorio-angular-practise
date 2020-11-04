import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Documento } from 'src/app/clases/documento';
import { Horario } from 'src/app/clases/horario';
import { Turnos } from 'src/app/clases/turnos';
import {
  TipoUsuario,
  TipoUsuarioLabels,
} from 'src/app/enumClases/tipo-usuario';
import { HorarioService } from 'src/app/servicios/horario.service';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { CartelInformeComponent } from '../common/cartel-informe/cartel-informe.component';
import { AvisoDialogModel } from '../common/tarjetas/tarjeta/detalle-tarjeta/detalle-tarjeta.component';
import { TurnosComponent } from '../turnos/turnos.component';
import { HorariosProfesionalComponent } from './horarios-profesional/horarios-profesional.component';

@Component({
  selector: 'app-profesional-mas-listado',
  templateUrl: './profesional-mas-listado.component.html',
  styleUrls: ['./profesional-mas-listado.component.scss'],
})
export class ProfesionalMasListadoComponent implements OnInit {
  public listadoParaCompartir: Array<Documento<Horario>>;
    @ViewChild('listadoResultados') listadoResultados: HorariosProfesionalComponent;

  public tipoUsuarioLabel = TipoUsuarioLabels;


  constructor(private horarioService: HorarioService, private dialog: MatDialog) {
    this.listadoParaCompartir = new Array<any>();
  }

  ngOnInit(): void {
    var email = localStorage.getItem('email');
    if (email == undefined || email == null) {
      this.showError('Usuario no loggeado');
      return;
    }

    this.horarioService
      .getHorariosByEmail(
        email,
        this.tipoUsuarioLabel.get(TipoUsuario.Profesional)
      )
      .subscribe(
        (data) => {
          this.listadoResultados.listado = data;
          this.listadoResultados.refresh();
        },
        (error) => {
          console.log(error);
        }
      );
  }


  public showError(error: string): void {
    console.log(error);
    const dialogData = new AvisoDialogModel('Ha ocurrido un problema!', error);
    this.dialog.open(CartelInformeComponent, {
      maxWidth: '400px',
      data: dialogData,
    });
  }

  agregarHorario(horario: Horario)
  {
    this.horarioService.create_horario(horario)
    .then(() => console.log("ok"))
    .catch((error) => console.log(error));
    var doc = new Documento<Horario>();
    doc.data = horario;
    this.listadoParaCompartir.push(doc);
    this.listadoResultados.refresh();
  }
}
