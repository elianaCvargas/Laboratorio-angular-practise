import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
  // animations: [
  //   slideInAnimation
  // ]
})
export class AppComponent {
  title = 'angular-firebase-crud';
  // prepareRoute(outlet: RouterOutlet) {
  //   return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  // }

  // prepareRoute(outlet: RouterOutlet) {
  //   return outlet &&
  //     outlet.activatedRouteData &&
  //     outlet.activatedRouteData['animationState'];
  //  }
}
