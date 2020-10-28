import { Component, Inject, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('checkbox')
  public mulObj;

  public especialidades: { [key: string]: Object }[] = [
    { Name: 'Australia', Code: 'AU' },
    { Name: 'Bermuda', Code: 'BM' },
    { Name: 'Canada', Code: 'CA' },
    { Name: 'Cameroon', Code: 'CM' },
    { Name: 'Denmark', Code: 'DK' },
    { Name: 'France', Code: 'FR' },
    { Name: 'Finland', Code: 'FI' },
    { Name: 'Germany', Code: 'DE' },
    { Name: 'Greenland', Code: 'GL' },
    { Name: 'Hong Kong', Code: 'HK' },
    { Name: 'India', Code: 'IN' },
    { Name: 'Italy', Code: 'IT' },
    { Name: 'Japan', Code: 'JP' },
    { Name: 'Mexico', Code: 'MX' },
    { Name: 'Norway', Code: 'NO' },
    { Name: 'Poland', Code: 'PL' },
    { Name: 'Switzerland', Code: 'CH' },
    { Name: 'United Kingdom', Code: 'GB' },
    { Name: 'United States', Code: 'US' },
  ];

  // map the groupBy field with category column
  public checkFields: Object = { text: 'Name', value: 'Code' };
  // set the placeholder to the MultiSelect input
  public checkWaterMark: string = 'Select countries';
  // set the MultiSelect popup height
  public popHeight: string = '350px';

  public mode: string;
  public filterPlaceholder: string;

  ngOnInit() {
    this.mode = 'CheckBox';
    this.filterPlaceholder = 'Search countries';
  }

  constructor(
    public dialogRef: MatDialogRef<RegistroUsuarioComponent>,
    public dialog: MatDialog,
    private authService: AuthService,
    private pacienteService: PacienteService,
    private fileService: FileService,
    public builder: FormBuilder,
    private route: Router
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
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (
      this.filesToUpload.length == 0 ||
      this.filesToUpload.length == 1 ||
      this.filesToUpload.length >= 3
    ) {
      this.showError('Por favor adgunte dos imagenes');
    } else {
      if (this.tipoUsuario !== undefined) {
        this.filesToUpload;
        this.authService
          .register(
            this.userGroup.controls.email.value,
            this.userGroup.controls.password1.value
          )
          .then((res) => {
            if (this.tipoUsuario === TipoUsuario.Paciente) {
              this.regitrarPaciente();
            } else {
            }
          })
          .catch((error) => this.showError(error));
      } else {
        this.showError('Debe seleccionar un tipo de usuario');
      }
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
    this.dialog.open(CartelInformeComponent, {
      maxWidth: '400px',
      data: dialogData,
    });
    this.route.navigate(['/login']);
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
      // if ( files.length <= 2) {
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
      // }
      // else{
      //   this.showError('Debe subir dos imagenes');
      // }
    } else {
      this.showError('Adjunte las imagenes, por favor');
    }
  }

  removeFile(file: any) {
    const index = this.filesToUpload.indexOf(file);
    this.filesToUpload.splice(index, 1);
  }

  regitrarPaciente() {
    var nuevoPaciente = new Paciente(
      this.userGroup.controls.nombre.value,
      this.userGroup.controls.apellido.value,
      this.userGroup.controls.email.value,
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
            this.pacienteService
              .create_paciente(nuevoPaciente)
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

  registrarProfesional() {}

  // public onChange(): void {
  //   // enable or disable the select all in Multiselect based on CheckBox checked state
  //   this.mulObj.showSelectAll = this.checkboxObj.checked;
  // }
  // public onChangeDrop(): void {
  //   // enable or disable the dropdown button in Multiselect based on CheckBox checked state
  //   this.mulObj.showDropDownIcon = this.dropdownObj.checked;
  // }
  // public onChangeReorder(): void {
  //   // enable or disable the list reorder in Multiselect based on CheckBox checked state
  //   this.mulObj.enableSelectionOrder = this.reorderObj.checked;
  // }
}
