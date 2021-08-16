import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//componentes
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './register/register/register.component';
import { PartidoComponent } from './partidos/partido/partido.component';
import { FormComponent } from './partidos/partido/form.component';
import { FormEditComponent } from './partidos/partido/form-edit.component';
const routes: Routes = [
  { path:'', redirectTo:'home', pathMatch:'full'},
  { path:'registro',  component:RegisterComponent},
  { path:'login',  component:LoginComponent},
  { path:'partido',  component:PartidoComponent},
  { path:'registro-partido',  component:FormComponent},
  { path: 'editar-partido/:id', component:FormEditComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
