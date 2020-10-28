import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { AvisoDialogModel, CartelInformeComponent } from '../common/cartel-informe/cartel-informe.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public username;
  public password;
  userGroup: FormGroup;

  constructor(private route: Router
    , private authService: AuthService
    ,private dialog: MatDialog) {

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
      data: {name: this.username, animal: this.password}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(localStorage.getItem("isLogged") != undefined)
      {
        this.route.navigate(['Juegos']);
      }
    });
  }

  onSubmit()
  {
    this.username = this.userGroup.get('username').value;
    this.password =  this.userGroup.get('password').value;
    this.authService.login(this.username, this.password).then((response) => {
      if(response.user.emailVerified)
      {
        localStorage.setItem("isLogged", "true");
        this.route.navigate(['turnos-paciente']);
      }
      else {
        this.showError("Requiere verificación del email.");
      }
    }).catch((error) => {
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

  registrarse()
  {}
  recuperarContra()
  {}

}
