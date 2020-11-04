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
import { ListaUsuariosComponent } from './componentes/lista-usuarios/lista-usuarios.component';
import { AltaAdminComponent } from './componentes/alta-admin/alta-admin.component';
import { ProfesionalMasListadoComponent } from './componentes/profesional-mas-listado/profesional-mas-listado.component';
import { TurnosComponent } from './componentes/turnos/turnos.component';

const routes: Routes = [
  {
    path: '',component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent, data: {animation: 'Login'} },
      { path: 'turnos-paciente', component: TurnosComponent, data: {animation: 'Usuario'} },
      { path: 'registro', component: RegistroUsuarioComponent},
      { path: 'lista-usuarios', component: ListaUsuariosComponent },
      { path: 'alta-admin', component: AltaAdminComponent },
      { path: 'alta-disponibilidad-turnos', component: ProfesionalMasListadoComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],

  },
  //asi funciona la animacion
  // { path: 'login', component: LoginComponent, data: {animation: 'Login'} },
  // { path: 'turnos-paciente', component: TurnosPacienteComponent, data: {animation: 'Usuario'} },

  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
