import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TipoUsuario } from '../enumClases/tipo-usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public title: string;
  public message: string;

  constructor(
    private auth: AngularFireAuth,
    private route: Router,
    public dialog: MatDialog
  ) {}

  login(email: string, pass: string): Promise<any> {
    return this.auth
      .signInWithEmailAndPassword(email, pass)
      .then((res) => {
        if (res.user.emailVerified) {
          localStorage.setItem('isLogged', 'succes');
          localStorage.setItem('email', res.user.email);
          console.log('succes');
        }
      })
      .catch((err) => {
        if (err.code == 'auth/wrong-password') {
          this.message = 'Contraseña incorrecta';
        }

        return Promise.reject(this.message);
      });
  }

  SendEmailVerification(email: string) {
    return this.auth.currentUser.then((currentUser) => {
      currentUser.sendEmailVerification().then(() => {
        window.localStorage.setItem('emailForSignIn', email);
      });
    });
  }

  register(
    email: string,
    pass: string,
  ): Promise<any> {
    return this.auth
      .createUserWithEmailAndPassword(email, pass)
      .then((res) => {
        this.SendEmailVerification(email).then(() => {
          localStorage.setItem('isLogged', 'succes');
          localStorage.setItem('email', res.user.email);
          return res;
        });
      })
      .catch((err) => {
        switch (err.code) {
          case 'auth/email-already-in-use':
            this.message = 'Ya existe otro usuario con el mail ingresado';
            break;
          case 'auth/invalid-email':
            this.message = 'El formato debe ser: xyx@midominio.com';

            break;
          case 'auth/weak-password':
            this.message = 'El password debe contener al menos 6 letras';
            break;
          default:
            this.message = err;
            break;
        }

        return Promise.reject(this.message);
      });
  }
}
