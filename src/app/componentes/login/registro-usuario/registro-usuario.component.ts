import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Paciente } from 'src/app/clases/paciente';
import {
  TipoUsuario,
  TipoUsuarioLabels,
} from 'src/app/enumClases/tipo-usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { FileService } from 'src/app/servicios/file.service';
import { PacienteService } from 'src/app/servicios/paciente.service';
import {
  AvisoDialogModel,
  CartelInformeComponent,
} from '../../common/cartel-informe/cartel-informe.component';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.scss'],
})
export class RegistroUsuarioComponent implements OnInit {
  public username;
  userGroup: FormGroup;
  public isRegistered: boolean = false;
  public tipoUsuario: TipoUsuario;
  public tiposUsuariosCombo: Array<TipoUsuario>;
  public tiposUsuarios = TipoUsuario;
  public tipoUsuarioLabel = TipoUsuarioLabels;
  public filesToUpload: Array<File> = [];
  public url: string;

  ngOnInit() {}

  constructor(
    public dialogRef: MatDialogRef<RegistroUsuarioComponent>,
    public dialog: MatDialog,
    private authService: AuthService,
    private pacienteService: PacienteService,
    private fileService: FileService,
    public builder: FormBuilder,
    private route: Router
  ) {
    this.tiposUsuariosCombo = [
      TipoUsuario.Profesional,
      TipoUsuario.Paciente,
    ];

    this.userGroup = this.builder.group({
      nombre: [null, Validators.required],
      apellido: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password1: [null, [Validators.required, Validators.minLength(6)]],
      password2: [
        null,
        [
          Validators.required,
          this.passwordMatcher1.bind(this),
          Validators.minLength(6),
        ],
      ],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if(this.tipoUsuario !== undefined)
    {
       this.filesToUpload;
    this.authService
      .register(
        this.userGroup.controls.email.value,
        this.userGroup.controls.password1.value
      )
      .then((res) => {
        if (this.tipoUsuario === TipoUsuario.Paciente) {
          //subir imagen
          var nuevoPaciente = new Paciente(
            this.userGroup.controls.nombre.value,
            this.userGroup.controls.apellido.value,
            this.userGroup.controls.email.value,
            '',
            ''
          );
          this.fileService
            .subirArchivo(this.filesToUpload[0])
            .subscribe((url1) => {
              nuevoPaciente.imagenUno = url1;
              this.fileService
                .subirArchivo(this.filesToUpload[1])
                .subscribe((url2) => {
                  nuevoPaciente.imagenDos = url2;
                  //alta paciente
                  this.pacienteService
                    .create_paciente(nuevoPaciente)
                    .then(() => {
                      this.showSuccess("Paciente registrado con éxito!");
                    })
                    .catch((error) => this.showError(error));
                }, (error) => this.showError(error));
            },(error) => this.showError(error));
        }
      })
      .catch((error) => this.showError(error));
    } else {
      this.showError("Debe seleccionar un tipo de usuario");
    }

  }

  public showError(error: string): void {
    console.log(error);
    const dialogData = new AvisoDialogModel('Ha ocurrido un problema!', error);
    this.dialog.open(CartelInformeComponent, {
      maxWidth: '400px',
      data: dialogData,
    });
  }

  public showSuccess(success: string): void {
    const dialogData = new AvisoDialogModel('Información', success);
    this.dialog.open(CartelInformeComponent, {
      maxWidth: '400px',
      data: dialogData,
    });
  }

  private passwordMatcher1(control: FormControl): { [s: string]: boolean } {
    if (
      this.userGroup &&
      control.value !== this.userGroup.controls.password1.value
    ) {
      return { passwordNotMatch: true };
    }
    return null;
  }

  get password1(): AbstractControl {
    return this.userGroup.controls['password1'];
  }

  get password2(): AbstractControl {
    return this.userGroup.controls['password2'];
  }

  get email(): AbstractControl {
    return this.userGroup.controls['email'];
  }

  get nombreControl(): AbstractControl {
    return this.userGroup.controls['nombre'];
  }

  get apellidoControl(): AbstractControl {
    return this.userGroup.controls['apellido'];
  }

  onPasswordChange() {
    if (
      this.userGroup.controls.password1.value ===
      this.userGroup.controls.password2.value
    ) {
      this.password2.setErrors(null);
    } else {
      this.password2.setErrors({ passwordNotMatch: true });
    }
  }

  handleFileInput(files: FileList) {
    if (files !== undefined) {
      for (let i = 0; i < files.length; i++) {
        if (
          files[i].type === 'image/png' ||
          files[i].type === 'image/gif' ||
          files[i].type === 'image/jpeg'
        ) {
          this.filesToUpload.push(files[i]);
        } else {
          const dialogData = new AvisoDialogModel(
            'Ha ocurrido un problema!',
            'Solo puede subir una imagen'
          );
          this.dialog.open(CartelInformeComponent, {
            maxWidth: '400px',
            data: dialogData,
          });
        }
      }
    }
  }

  removeFile(file: any) {
    const index = this.filesToUpload.indexOf(file);
    this.filesToUpload.splice(index, 1);
  }
}

