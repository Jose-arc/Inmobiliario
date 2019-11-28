import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Pages
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { OferenteComponent } from './pages/oferente/oferente.component';
import { PropiedadesComponent } from './pages/propiedades/propiedades.component';
import { AddNoticiasComponent } from './pages/add-noticias/add-noticias.component';

// End

//Guard
import { AuthGuard } from './guards/auth.guard';
//End

const routes: Routes = [
  { path: 'home' , component:HomeComponent, canActivate: [ AuthGuard ] },
  { path: 'noticias' , component:NoticiasComponent, canActivate: [ AuthGuard ] },
  { path: 'add-noticia' , component:AddNoticiasComponent, canActivate: [ AuthGuard ] },
  { path: 'oferente' , component:OferenteComponent, canActivate: [ AuthGuard ] },
  { path: 'propiedades' , component:PropiedadesComponent, canActivate: [ AuthGuard ] },
  { path: 'registro' , component:RegistroComponent },
  { path: 'login' , component:LoginComponent },
  { path: '**' , redirectTo:'registro' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
