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
import { ListcategorianoticiasComponent } from './pages/listcategorianoticias/listcategorianoticias.component';
import { AddOferenteComponent } from './pages/add-oferente/add-oferente.component';
import { ListcategoriaoferenteComponent } from './pages/listcategoriaoferente/listcategoriaoferente.component';
import { OferenteUpdateComponent } from './pages/oferente/oferente-update.component';
import { AddPropiedadComponent } from './pages/add-propiedad/add-propiedad.component';
import { PropiedadUpdateComponent } from './pages/propiedades/propiedades-update.component';

//End

//Pipes
import { FirstimgPipe } from "./pipes/firstimg.pipe";
import { AcortadorTextPipe } from './pipes/acortador-text.pipe';
import { PropiedadDetailComponent } from './pages/propiedad-detail/propiedad-detail.component';
//end

//Resize IMG
import { Ng2ImgMaxModule } from 'ng2-img-max';

//Google Adsense para bloques de anuncios
import { AdsenseModule } from 'ng2-adsense';

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
    ListcategorianoticiasComponent,
    AddOferenteComponent,
    ListcategoriaoferenteComponent,
    OferenteUpdateComponent,
    AddPropiedadComponent,
    PropiedadUpdateComponent,
    PropiedadDetailComponent
  ],
  imports: [BrowserModule, 
            FormsModule, 
            HttpClientModule, 
            AppRoutingModule,
            Ng2ImgMaxModule,
            AdsenseModule.forRoot({
              adClient: 'ca-pub-5508568210841212',
              adSlot: 2459665283,
            })],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
