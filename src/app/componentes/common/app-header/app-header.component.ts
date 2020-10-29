import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoUsuario } from 'src/app/enumClases/tipo-usuario';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  public tipoUsuarioLogged;
  public tipoUsuarioEnum = TipoUsuario;
  constructor(private route: Router) { }

  ngOnInit() {
  }

  isLoggedIn(): boolean {
    this.tipoUsuarioLogged = localStorage.getItem("tipoUsuario");
    return localStorage.getItem("isLogged") != undefined;
  }

  logout() {
    localStorage.removeItem("isLogged");
    this.route.navigate(['/login']);
  }

}
