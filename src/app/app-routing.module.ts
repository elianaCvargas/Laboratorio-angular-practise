import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TablaPaisesComponent } from './componentes/common/tabla-paises/tabla-paises.component';
import { TablaPeliculaComponent } from './componentes/common/tabla-pelicula/tabla-pelicula.component';
import { EmptyLayoutAltaActorComponent } from './componentes/empty-layout-alta-actor/empty-layout-alta-actor.component';
import { ActorAltaComponent } from './componentes/layout/actor-alta/actor-alta.component';
import { ActorListadoComponent } from './componentes/layout/actor-listado/actor-listado.component';
import { BienvenidoComponent } from './componentes/layout/bienvenido/bienvenido.component';
import { BusquedaComponent } from './componentes/layout/busqueda/busqueda.component';
import { LayoutComponent } from './componentes/layout/layout.component';
import { PeliculaAltaComponent } from './componentes/layout/pelicula-alta/pelicula-alta.component';
import { PeliculaListadoComponent } from './componentes/layout/pelicula-listado/pelicula-listado.component';
import { PaisActorComponent } from './componentes/pais-actor/pais-actor.component';
import { RegistroUsuarioComponent } from './componentes/login/registro-usuario/registro-usuario.component';
import { LoginComponent } from './componentes/login/login.component';
import { TurnosPacienteComponent } from './componentes/turnos-paciente/turnos-paciente.component';

const routes: Routes = [
  {
    path: '',component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'registro', component: RegistroUsuarioComponent },
      { path: 'turnos-paciente', component: TurnosPacienteComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
