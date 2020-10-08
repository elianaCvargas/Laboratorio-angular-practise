import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActorAltaComponent } from './componentes/layout/actor-alta/actor-alta.component';
import { ActorListadoComponent } from './componentes/layout/actor-listado/actor-listado.component';
import { BienvenidoComponent } from './componentes/layout/bienvenido/bienvenido.component';
import { BusquedaComponent } from './componentes/layout/busqueda/busqueda.component';
import { LayoutComponent } from './componentes/layout/layout.component';
import { PeliculaAltaComponent } from './componentes/layout/pelicula-alta/pelicula-alta.component';
import { PeliculaListadoComponent } from './componentes/layout/pelicula-listado/pelicula-listado.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'Bienvenido', pathMatch: 'full' },
      { path: 'Bienvenido', component:  BienvenidoComponent},
      { path: 'Busqueda', component:  BusquedaComponent},
      { path: 'Peliculas/Alta', component:  PeliculaAltaComponent},
      { path: 'Actor/Alta', component:  ActorAltaComponent},
      { path: 'Actor/Listado', component:  ActorListadoComponent},
      { path: 'Peliculas/Listado', component:  PeliculaListadoComponent},
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ],
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
