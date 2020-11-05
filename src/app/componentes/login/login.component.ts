import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Especialidad } from 'src/app/clases/especialidad';
import { Profesional } from 'src/app/clases/profesional';
import { Usuario } from 'src/app/clases/usuario';
import { TipoUsuario, TipoUsuarioLabels } from 'src/app/enumClases/tipo-usuario';
import { AdministradorService } from 'src/app/servicios/administrador.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import {
  AvisoDialogModel,
  CartelInformeComponent,
} from '../common/cartel-informe/cartel-informe.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public username;
  public password;
  userGroup: FormGroup;
  public profesional;
  public tipoUsuarioLabel = TipoUsuarioLabels;
  constructor(
    private route: Router,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private dialog: MatDialog,
    private admin: AdministradorService
  ) {
    // this.dummy();

    // this.admin.create_especialidad(new Especialidad("Dentista"));
  }

  ngOnInit() {
    this.userGroup = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });


  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RegistroUsuarioComponent, {
      width: '500px',
      data: { name: this.username, animal: this.password },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (localStorage.getItem('isLogged') != undefined) {
        this.route.navigate(['Juegos']);
      }
    });
  }

  onSubmit() {
    this.username = this.userGroup.get('username').value;
    this.password = this.userGroup.get('password').value;


    this.authService
      .login(this.username, this.password)
      .then((response) => {
        this.usuarioService.getUserByEmail(this.username).subscribe(
          (usuario) => {
            switch (usuario.data.tipoUsuario) {
              case TipoUsuario.Paciente:
                if (!response.user.emailVerified) {
                  this.showError('Requiere verificación del email.');
                  return;
                }

                this.route.navigate(['turnos-paciente']);
                break;
              case TipoUsuario.Profesional:
                this.profesional = usuario.data;
                if(!this.profesional.habilitado)
                {
                  this.showError('Requiere aprobación de un administrador.');
                  return;
                }

                this.route.navigate(['turnos-paciente']);
                break;
              case TipoUsuario.Administrador:
                this.route.navigate(['lista-usuarios']);
                console.log(usuario);

                break;
            }

            localStorage.setItem('isLogged', 'true');
            localStorage.setItem('email', usuario.data.email);
            localStorage.setItem('nombre', usuario.data.nombre);
            localStorage.setItem('apellido', usuario.data.apellido);
            localStorage.setItem('tipoUsuario', this.tipoUsuarioLabel.get(usuario.data.tipoUsuario));
          },
          (error) => {
            this.showError(error);
          }
        );
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

  dummy() {
    this.usuarioService.create_admin(new Usuario("Admin", "Admin", "carla@gmail.com", TipoUsuario.Administrador, "asdasd")).then
    (
      () => {console.log("success");}
    ).catch((err) => {
      console.log(err);
    });
  }

  recuperarContra() {}
}
