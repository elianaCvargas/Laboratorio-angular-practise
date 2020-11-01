import { Component, OnInit } from '@angular/core';
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
import { Administrador } from 'src/app/clases/administrador';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { CartelInformeComponent } from '../common/cartel-informe/cartel-informe.component';
import { AvisoDialogModel } from '../common/tarjetas/tarjeta/detalle-tarjeta/detalle-tarjeta.component';

@Component({
  selector: 'app-alta-admin',
  templateUrl: './alta-admin.component.html',
  styleUrls: ['./alta-admin.component.scss'],
})
export class AltaAdminComponent implements OnInit {
  adminGroup: FormGroup;

  constructor(
    public builder: FormBuilder,
    private usuarioService: UsuarioService,
    private route: Router,
    public dialog: MatDialog,
    private authService: AuthService
  ) {
    this.adminGroup = this.builder.group({
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

  ngOnInit(): void {}

  private passwordMatcher1(control: FormControl): { [s: string]: boolean } {
    if (
      this.adminGroup &&
      control.value !== this.adminGroup.controls.password1.value
    ) {
      return { passwordNotMatch: true };
    }
    return null;
  }

  get password1(): AbstractControl {
    return this.adminGroup.controls['password1'];
  }

  get password2(): AbstractControl {
    return this.adminGroup.controls['password2'];
  }

  get email(): AbstractControl {
    return this.adminGroup.controls['email'];
  }

  get nombreControl(): AbstractControl {
    return this.adminGroup.controls['nombre'];
  }

  get apellidoControl(): AbstractControl {
    return this.adminGroup.controls['apellido'];
  }

  agregarAdmin() {
    var administrador = new Administrador(
      this.nombreControl.value,
      this.apellidoControl.value,
      this.email.value,
      this.password1.value
    );
    this.authService
      .register(administrador.email, administrador.password)
      .then(() => {
        this.usuarioService.create_usuario(administrador).then(() => {
          this.showSuccess('Administrador agregado con éxito!');
        }).catch((error) => {
          this.showError(error);
        });
      })
      .catch((error) => {
        this.showError(error);
      });
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

  // public showSuccessOnlyRegister(success: string): void {
  //   const dialogData = new AvisoDialogModel('Información', success);
  //   const dialog = this.dialog.open(CartelInformeComponent, {
  //     maxWidth: '400px',
  //     data: dialogData,
  //   });

  //   dialog.afterClosed().subscribe(() => {
  //     this.dialogRef.close();
  //     this.dialogRef.afterClosed().subscribe(() => {
  //       this.route.navigate(['/login']);
  //     });
  //   });
  // }
}
