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
import { Profesional } from 'src/app/clases/profesional';
import {
  TipoEspecialidad,
  TipoEspecialidadLabels,
} from 'src/app/enumClases/especialidad-profesional';
import {
  TipoUsuario,
  TipoUsuarioLabels,
} from 'src/app/enumClases/tipo-usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { FileService } from 'src/app/servicios/file.service';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { ProfesionalService } from 'src/app/servicios/profesional.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
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
  public tipoUsuarioSeleccionado: TipoUsuario;

  public tiposUsuariosCombo: Array<TipoUsuario>;
  public tiposUsuariosEnum = TipoUsuario;
  public tipoUsuarioLabel = TipoUsuarioLabels;
  public filesToUpload: Array<File> = [];
  public url: string;
  public especialidadesCmb: TipoEspecialidad[];
  public tipoEspecialidadLabel = TipoEspecialidadLabels;

  ngOnInit() {}

  constructor(
    public dialogRef: MatDialogRef<RegistroUsuarioComponent>,
    public dialog: MatDialog,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private fileService: FileService,
    public builder: FormBuilder,
    private route: Router,
    private profesionalService: ProfesionalService
  ) {
    this.tiposUsuariosCombo = [TipoUsuario.Profesional, TipoUsuario.Paciente];

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
      especialidades: [[], this.validarEspecialidad.bind(this)],
    });

    this.especialidadesCmb = [
      TipoEspecialidad.Cirugia,
      TipoEspecialidad.Dentista,
      TipoEspecialidad.Oculista,
    ];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.tipoUsuarioSeleccionado !== undefined) {
      this.filesToUpload;
      this.authService
        .register(
          this.userGroup.controls.email.value,
          this.userGroup.controls.password1.value
        )
        .then((res) => {
          if (this.tipoUsuarioSeleccionado === TipoUsuario.Paciente) {
            if (this.filesToUpload.length < 2) {
              this.showError('Debe subir dos imagenes');
              return;
            }

            this.regitrarPaciente();
          } else {
            this.registrarProfesional();
          }
        })
        .catch((error) => this.showError(error));
    } else {
      this.showError('Debe seleccionar un tipo de usuario');
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

  public showSuccessOnlyRegister(success: string): void {
    const dialogData = new AvisoDialogModel('Información', success);
    const dialog = this.dialog.open(CartelInformeComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    dialog.afterClosed().subscribe(() => {
      this.dialogRef.close();
      this.dialogRef.afterClosed().subscribe(() => {
        this.route.navigate(['/login']);
      });
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

  private validarEspecialidad(control: FormControl): { [s: string]: boolean } {
    if (
      this.userGroup &&
      this.tipoUsuarioSeleccionado == TipoUsuario.Profesional &&
      control.value.length == 0
    ) {
      return { especialidadIsNotValid: true };
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

  get especialidadesControl(): AbstractControl {
    return this.userGroup.controls['especialidades'];
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
    if (!files) {
      this.showError('Adjunte las imagenes, por favor');
      return;
    }

    for (let i = 0; i < files.length; i++) {
      if (
        files[i].type === 'image/png' ||
        files[i].type === 'image/gif' ||
        files[i].type === 'image/jpeg'
      ) {
        this.filesToUpload.push(files[i]);
      } else {
        this.showError('Solo puede subir imagenes');
      }
    }
  }

  removeFile(file: any) {
    const index = this.filesToUpload.indexOf(file);
    this.filesToUpload.splice(index, 1);
  }

  regitrarPaciente() {
    var nuevoPaciente = new Paciente(
      this.nombreControl.value,
      this.apellidoControl.value,
      this.email.value,
      '',
      ''
    );
    this.fileService.subirArchivo(this.filesToUpload[0]).subscribe(
      (url1) => {
        nuevoPaciente.imagenUno = url1;
        this.fileService.subirArchivo(this.filesToUpload[1]).subscribe(
          (url2) => {
            nuevoPaciente.imagenDos = url2;
            //alta paciente
            this.usuarioService
              .create_usuario(nuevoPaciente)
              .then(() => {
                this.showSuccessOnlyRegister('Paciente registrado con éxito!');
              })
              .catch((error) => this.showError(error));
          },
          (error) => this.showError(error)
        );
      },
      (error) => this.showError(error)
    );
  }

  registrarProfesional() {
    var nuevoPprofesional = new Profesional(
      this.userGroup.controls.nombre.value,
      this.userGroup.controls.apellido.value,
      this.userGroup.controls.email.value,
      this.especialidadesControl.value
    );

    this.usuarioService.create_usuario(nuevoPprofesional)
    .then(() => {
        this.showSuccessOnlyRegister("Profesional registrado con éxito.");
    })
    .catch((error) => {
      this.showError(error);
    });

  }
}
