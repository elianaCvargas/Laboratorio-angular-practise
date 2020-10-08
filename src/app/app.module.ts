import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './componentes/layout/layout.component';
import { BienvenidoComponent } from './componentes/layout/bienvenido/bienvenido.component';
import { PeliculaAltaComponent } from './componentes/layout/pelicula-alta/pelicula-alta.component';
import { ActorAltaComponent } from './componentes/layout/actor-alta/actor-alta.component';
import { ActorListadoComponent } from './componentes/layout/actor-listado/actor-listado.component';
import { PeliculaListadoComponent } from './componentes/layout/pelicula-listado/pelicula-listado.component';
import { TablaPeliculaComponent } from './componentes/common/tabla-pelicula/tabla-pelicula.component';
import { BusquedaComponent } from './componentes/layout/busqueda/busqueda.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    BusquedaComponent,
    LayoutComponent,
    BienvenidoComponent,
    PeliculaAltaComponent,
    ActorAltaComponent,
    ActorListadoComponent,
    PeliculaListadoComponent,
    TablaPeliculaComponent
  ],
  imports: [
    MatDatepickerModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
