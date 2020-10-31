import { Component, Inject, OnInit, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Documento } from 'src/app/clases/documento';
import { Turnos } from 'src/app/clases/turnos';
import { TipoUsuario, TipoUsuarioLabels } from 'src/app/enumClases/tipo-usuario';
import { TurnosService } from 'src/app/servicios/turnos.service';

@Component({
  selector: 'app-cartel-input-informe',
  templateUrl: './cartel-input-informe.component.html',
  styleUrls: ['./cartel-input-informe.component.scss']
})

export class CartelInputComponent implements OnInit {

  turno: Documento<Turnos>;
  comentario: string = "";

  public tipoUsuarioLogged = localStorage.getItem("tipoUsuario");
  title: string;



  constructor(
    public dialogRef: MatDialogRef<CartelInputComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InputDialogModel,
    private turnosService: TurnosService) {
      this.turno = data.turno;
      this.title = data.title;
  }


  closeDialog() {
    this.dialogRef.close();
  }

  ngOnInit() {
    // this.comentario = "";
  }

  doTextareaValueChange(event){
    try{
      this.comentario = event.target.value;
    } catch(e){
      console.info("could not set textarea-value");
    }
  }

  onConfirm(): void {
    if(this.tipoUsuarioLogged === TipoUsuarioLabels.get(TipoUsuario.Profesional)){
      this.turno.data.reseniaProfesional = this.comentario;
    }
    else if(this.tipoUsuarioLogged === TipoUsuarioLabels.get(TipoUsuario.Paciente))
    {
      this.turno.data.reseniaPaciente = this.comentario;
    }
    //firabes udpate call
    this.turnosService.updateRegistroTurnoById(this.turno);

    console.log('onConfirm ' + this.dialogRef);
    this.dialogRef.close();
  }

}

export class InputDialogModel {
  constructor(public title: string, public turno: Documento<Turnos>) { }
}
