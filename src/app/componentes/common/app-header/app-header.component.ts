import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

  userIsLogged: boolean;
  constructor(private route: Router) { }

  ngOnInit() {
    this.userIsLogged = localStorage.getItem("isLogged") != undefined ? true : false;
  }

  logout() {
    this.userIsLogged = false;
    localStorage.removeItem("isLogged");
    this.route.navigate(['/Juegos']);
  }

}
