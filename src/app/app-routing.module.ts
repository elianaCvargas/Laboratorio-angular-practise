import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TablaPaisesComponent } from './componentes/common/tabla-paises/tabla-paises.component';
import { TablaPeliculaComponent } from './componentes/common/tabla-pelicula/tabla-pelicula.component';
import { ActorAltaComponent } from './componentes/layout/actor-alta/actor-alta.component';
import { ActorListadoComponent } from './componentes/layout/actor-listado/actor-listado.component';
import { BienvenidoComponent } from './componentes/layout/bienvenido/bienvenido.component';
import { BusquedaComponent } from './componentes/layout/busqueda/busqueda.component';
import { LayoutComponent } from './componentes/layout/layout.component';
import { PeliculaAltaComponent } from './componentes/layout/pelicula-alta/pelicula-alta.component';
import { PeliculaListadoComponent } from './componentes/layout/pelicula-listado/pelicula-listado.component';
import { PaisActorComponent } from './componentes/pais-actor/pais-actor.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'paisActor', pathMatch: 'full' },
      { path: 'bienvenido', component:  BienvenidoComponent},
      { path: 'busqueda', component:  BusquedaComponent},
      { path: 'actor/listado', component:  ActorListadoComponent},
      { path: 'peliculas/listado', component:  PeliculaListadoComponent},
      { path: 'pelicula/tabla', component:  TablaPeliculaComponent},
//parcial
// llamar primero a este!!

      // { path: '', redirectTo: 'AltaActor', pathMatch: 'full' },
      { path: 'actor/alta', component:  ActorAltaComponent},
      { path: 'paisActor', component:  PaisActorComponent},
      { path: 'pais/tabla', component:  TablaPaisesComponent},

      { path: 'pelicula/alta', component:  PeliculaAltaComponent},




      { path: '**', redirectTo: '', pathMatch: 'full' }
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
