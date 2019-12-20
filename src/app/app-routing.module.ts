import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Pages
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from "./pages/login/login.component";
import { RegistroComponent } from "./pages/registro/registro.component";
import { NoticiasComponent } from "./pages/noticias/noticias.component";
import { OferenteComponent } from "./pages/oferente/oferente.component";
import { PropiedadesComponent } from "./pages/propiedades/propiedades.component";
import { AddNoticiasComponent } from "./pages/add-noticias/add-noticias.component";
import { NoticiaDetailComponent } from "./pages/noticia-detail/noticia-detail.component";
import { NoticiaUpdateComponent } from "./pages/noticias/noticias-update.component";
import { ListcategorianoticiasComponent } from './pages/listcategorianoticias/listcategorianoticias.component';
import { AddOferenteComponent } from './pages/add-oferente/add-oferente.component';
import { OferenteUpdateComponent } from './pages/oferente/oferente-update.component';
import { ListcategoriaoferenteComponent } from './pages/listcategoriaoferente/listcategoriaoferente.component';
import { AddPropiedadComponent } from './pages/add-propiedad/add-propiedad.component';
import { PropiedadUpdateComponent } from './pages/propiedades/propiedades-update.component';
import { PropiedadDetailComponent } from './pages/propiedad-detail/propiedad-detail.component';
// End

//Guard
import { AuthGuard } from "./guards/auth.guard";
//End

const routes: Routes = [
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "noticias", component: NoticiasComponent, canActivate: [AuthGuard] },
  {
    path: "add-noticia",
    component: AddNoticiasComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "noticia/:id",
    component: NoticiaDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "categoria-noticia/:id",
    component: ListcategorianoticiasComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "noticia-update/:id",
    component: NoticiaUpdateComponent,
    canActivate: [AuthGuard]
  },

  { path: "oferente", component: OferenteComponent, canActivate: [AuthGuard] },
  {
    path: "add-oferente",
    component: AddOferenteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "oferente-update/:id",
    component: OferenteUpdateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "categoria-oferente/:id",
    component: ListcategoriaoferenteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "propiedades",
    component: PropiedadesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "add-propiedades",
    component: AddPropiedadComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "propiedad-update/:id",
    component: PropiedadUpdateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "propiedad/:id",
    component: PropiedadDetailComponent,
    canActivate: [AuthGuard]
  },
  { path: "registro", component: RegistroComponent },
  { path: "login", component: LoginComponent },
  { path: "**", redirectTo: "registro" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
