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
import { MatFormFieldModule } from '@angular/material/form-field';
import {DemoMaterialModule} from './material-module';
import { DetalleComponent } from './componentes/layout/busqueda/detalle/detalle.component';
import { TarjetasComponent } from './componentes/common/tarjetas/tarjetas.component';
import { TarjetaComponent } from './componentes/common/tarjetas/tarjeta/tarjeta.component';
import { DetalleTarjetaComponent } from './componentes/common/tarjetas/tarjeta/detalle-tarjeta/detalle-tarjeta.component';
import { TablaPaisesComponent } from './componentes/common/tabla-paises/tabla-paises.component';
import { AllServicesService } from './servicios/all-services.service';
import { HttpClientModule } from '@angular/common/http';
import { PaisActorComponent } from './componentes/pais-actor/pais-actor.component';
import { DetallePaisComponent } from './componentes/pais-actor/detalle-pais/detalle-pais.component';

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
    TablaPeliculaComponent,
    DetalleComponent,
    TarjetasComponent,
    TarjetaComponent,
    DetalleTarjetaComponent,
    TablaPaisesComponent,
    PaisActorComponent,
    DetallePaisComponent,

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
    MatFormFieldModule,
    DemoMaterialModule,
    HttpClientModule
  ],
  providers: [AllServicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
