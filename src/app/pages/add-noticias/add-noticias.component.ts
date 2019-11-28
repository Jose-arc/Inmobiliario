import { Component, OnInit } from '@angular/core';

// Imports
import { Router } from '@angular/router';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Noticias } from 'src/app/models/noticias.model';
import { GlobalsService } from 'src/app/services/globals.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-noticias',
  templateUrl: './add-noticias.component.html',
  styleUrls: ['./add-noticias.component.css'],
  providers: [NoticiasService]
})
export class AddNoticiasComponent implements OnInit {

  public titulo : string;
  public noticias: Noticias;
  public archivoParaSubir;
  public resultadoSubida;
  public fechaActual;
  public idNews;

  constructor(private _ns: NoticiasService,
              private _g: GlobalsService,
              private _router: Router) {

    this.titulo = 'Añadir una noticia';
    this.fechaActual = _g.getFecha();
    this.idNews = _ns.makeId();
    this.noticias = new Noticias('',this.idNews,'','','',this.fechaActual);

   }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.noticias);
    Swal.fire({
      
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor'

    });
    Swal.showLoading();

    this.addNewsletter();
  }

  addNewsletter(){

    this._ns.addNoticias(this.noticias).subscribe(

      result =>{
        if (result.code == 200) {
          Swal.close();
          this._router.navigateByUrl('/noticias');
        }else{
          Swal.fire({
      
            allowOutsideClick: false,
            icon: 'error',
            title: 'Error en login',
            text: result
      
          });
        }

      },
      error =>{
        console.log(error);
      }

    );

  }

}
