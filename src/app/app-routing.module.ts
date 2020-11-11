import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './componentes/layout/layout.component';
import { RegistroUsuarioComponent } from './componentes/login/registro-usuario/registro-usuario.component';
import { LoginComponent } from './componentes/login/login.component';
import { ListaUsuariosComponent } from './componentes/lista-usuarios/lista-usuarios.component';
import { AltaAdminComponent } from './componentes/alta-admin/alta-admin.component';
import { ProfesionalMasListadoComponent } from './componentes/profesional-mas-listado/profesional-mas-listado.component';
import { TurnosComponent } from './componentes/turnos/turnos.component';
import { TurnoMasListadoComponent } from './componentes/turno-mas-listado/turno-mas-listado.component';

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
      { path: 'horarios-profesional', component: ProfesionalMasListadoComponent },
      { path: 'turnos', component: TurnoMasListadoComponent , data: {animation: 'Usuario'}},

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
