import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

//Pages
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from "./pages/login/login.component";
import { RegistroComponent } from "./pages/registro/registro.component";
import { NoticiasComponent } from "./pages/noticias/noticias.component";
import { OferenteComponent } from "./pages/oferente/oferente.component";
import { PropiedadesComponent } from "./pages/propiedades/propiedades.component";
import { AddNoticiasComponent } from "./pages/add-noticias/add-noticias.component";
import { NoticiaDetailComponent } from "./pages/noticia-detail/noticia-detail.component";
import { NoticiaUpdateComponent } from "./pages/noticias/noticias-update.component";
//End

//Pipes
import { FirstimgPipe } from "./pipes/firstimg.pipe";
import { AcortadorTextPipe } from './pipes/acortador-text.pipe';
import { ListcategorianoticiasComponent } from './pages/listcategorianoticias/listcategorianoticias.component';
//end

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistroComponent,
    NoticiasComponent,
    OferenteComponent,
    PropiedadesComponent,
    AddNoticiasComponent,
    NoticiaDetailComponent,
    FirstimgPipe,
    NoticiaUpdateComponent,
    AcortadorTextPipe,
    ListcategorianoticiasComponent
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
