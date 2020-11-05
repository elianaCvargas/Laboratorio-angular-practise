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
import { DemoMaterialModule } from './material-module';
import { DetalleComponent } from './componentes/layout/busqueda/detalle/detalle.component';
import { TarjetasComponent } from './componentes/common/tarjetas/tarjetas.component';
import { TarjetaComponent } from './componentes/common/tarjetas/tarjeta/tarjeta.component';
import { DetalleTarjetaComponent } from './componentes/common/tarjetas/tarjeta/detalle-tarjeta/detalle-tarjeta.component';
import { TablaPaisesComponent } from './componentes/common/tabla-paises/tabla-paises.component';
import { AllServicesService } from './servicios/all-services.service';
import { HttpClientModule } from '@angular/common/http';
import { PaisActorComponent } from './componentes/pais-actor/pais-actor.component';
import { DetallePaisComponent } from './componentes/pais-actor/detalle-pais/detalle-pais.component';
import { AppHeaderComponent } from './componentes/common/app-header/app-header.component';
import { EmptyLayoutAltaActorComponent } from './componentes/empty-layout-alta-actor/empty-layout-alta-actor.component';
import { RegistroUsuarioComponent } from './componentes/login/registro-usuario/registro-usuario.component';
import { LoginComponent } from './componentes/login/login.component';
import { FooterComponent } from './componentes/common/footer/footer.component';
import { CartelInformeComponent } from './componentes/common/cartel-informe/cartel-informe.component';
import { CartelInputComponent } from './componentes/common/cartel-input-informe/cartel-input-informe.component';
import { ListaUsuariosComponent } from './componentes/lista-usuarios/lista-usuarios.component';
import { AltaAdminComponent } from './componentes/alta-admin/alta-admin.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProfesionalMasListadoComponent } from './componentes/profesional-mas-listado/profesional-mas-listado.component';
import { AltaDisponibilidadProfesionalComponent } from './componentes/profesional-mas-listado/alta-disponibilidad-profesional/alta-disponibilidad-profesional.component';
import { TurnosComponent } from './componentes/turnos/turnos.component';
import { HorariosProfesionalComponent } from './componentes/profesional-mas-listado/horarios-profesional/horarios-profesional.component';
import { TurnoMasListadoComponent } from './componentes/turno-mas-listado/turno-mas-listado.component';
import { AltaTurnoComponent } from './componentes/turno-mas-listado/alta-turno/alta-turno.component';

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
    AppHeaderComponent,
    EmptyLayoutAltaActorComponent,
    RegistroUsuarioComponent,
    LoginComponent,
    FooterComponent,
    CartelInformeComponent,
    CartelInputComponent,
    TurnosComponent,
    ListaUsuariosComponent,
    AltaAdminComponent,
    ProfesionalMasListadoComponent,
    AltaDisponibilidadProfesionalComponent,
    HorariosProfesionalComponent,
    TurnoMasListadoComponent,
    AltaTurnoComponent,
  ],
  imports: [
    BrowserModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
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
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
