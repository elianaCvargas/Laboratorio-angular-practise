import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { Horario } from 'src/app/clases/horario';
import { HorarioService } from 'src/app/servicios/horario.service';
import { CartelInformeComponent } from '../../common/cartel-informe/cartel-informe.component';
import { AvisoDialogModel } from '../../common/tarjetas/tarjeta/detalle-tarjeta/detalle-tarjeta.component';

@Component({
  selector: 'app-alta-disponibilidad-profesional',
  templateUrl: './alta-disponibilidad-profesional.component.html',
  styleUrls: ['./alta-disponibilidad-profesional.component.scss']
})
export class AltaDisponibilidadProfesionalComponent implements OnInit {
public fechaInicioSelected: Date;
public fechaFinSelected: Date;
public altaHorarioGroup: FormGroup;
public horarios: Array<Horario> = [];
public days = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado"];
public email: string;
@Output() addHorario: EventEmitter<Horario> = new EventEmitter();

  constructor(public builder: FormBuilder, private horarioService: HorarioService,  private dialog: MatDialog) {
    this.altaHorarioGroup = this.builder.group({
       fechaInicio: [null],
       fechaFin: [null],
      horariosForms: this.builder.array([])
    });
  }

  ngOnInit(): void {
    var email = localStorage.getItem('email');
    if (email == undefined || email == null) {
      this.showError('Usuario no loggeado');
      return;
    }
    this.email = email;
  }

  get fechaInicio(): AbstractControl {
    return this.altaHorarioGroup.controls['fechaInicio'];
  }

  get fechaFin(): AbstractControl {
    return this.altaHorarioGroup.controls['fechaFin'];
  }

  private validarEspecialidad(control: FormControl): { [s: string]: boolean } {
    if (
      this.altaHorarioGroup &&
      // this.tipoUsuarioSeleccionado == TipoUsuario.Profesional &&
      control.value.length == 0
    ) {
      return { especialidadIsNotValid: true };
    }
    return null;
  }

  setDaysInit(event: MatDatepickerInputEvent<Date>)
  {
    this.fechaInicioSelected = event.value;
  }

  setDaysEnd(event: MatDatepickerInputEvent<Date>)
  {
    this.fechaFinSelected = event.value;

    if(event.value) {
      var differenceInTime = this.fechaFinSelected.getTime() - this.fechaInicioSelected.getTime();
      var differenceInDays = differenceInTime / (1000 * 3600 * 24);

      for (let i = 0; i < differenceInDays + 1; i++) {
        var date = new Date(this.fechaInicioSelected.valueOf());
        date.setDate(date.getDate() + i);
        let horario = new Horario(date);
        horario.profesional = this.email;
        this.addItem(horario);
      }

     // date.toLocaleDateString('es-AR', { weekday: 'long' }).toUpperCase();

    }
  }

  get horariosForms(): any {
    return this.altaHorarioGroup.get('horariosForms') as FormArray;
  }

  getHorarioControl(i: number): AbstractControl {
    return this.horariosForms.controls[i].controls;
  }

  addItem(item: Horario) {
    this.horarios.push(item);

    this.horariosForms.push(this.builder.group({
      date: item.fecha,
      rango1: this.builder.control(false),
      rango2: this.builder.control(false),
      rango3: this.builder.control(false)
    }));
  }

  submit() {
    console.log("hola");
    const horarios = this.horarios.filter(x => x.rango.some(x => x));
    for (let i = 0; i < horarios.length; i++) {
      this.addHorario.emit(horarios[i]);

    }

  }

  onChange(horario: Horario, rango: number) {
    horario.rango[rango] = !horario.rango[rango];
  }

  public showError(error: string): void {
    console.log(error);
    const dialogData = new AvisoDialogModel('Ha ocurrido un problema!', error);
    this.dialog.open(CartelInformeComponent, {
      maxWidth: '400px',
      data: dialogData,
    });
  }
}
