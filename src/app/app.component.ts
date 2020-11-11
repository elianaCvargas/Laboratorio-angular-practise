import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animations';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy{
  title = 'angular-firebase-crud';
  mediaSub: Subscription;
  deviceXs: boolean;
  constructor(public mediaObserver: MediaObserver){
    this.mediaSub = this.mediaObserver.asObservable().subscribe(
      (result:MediaChange[]) => {
        for (const item of result) {
          console.log(item.mqAlias);
          this.deviceXs = item.mqAlias == 'xs' ? true : false;
        }


    });
  }
  ngOnInit(){}
  ngOnDestroy(){
this.mediaSub.unsubscribe();
  }
}
