import { Component, OnInit } from '@angular/core';

// Imports
import { Router, ActivatedRoute, Params } from "@angular/router";
import { NoticiasService } from "src/app/services/noticias.service";
import { Noticias } from "src/app/models/noticias.model";
import { GlobalsService } from "src/app/services/globals.service";
import Swal from "sweetalert2";
import { GLOBAL } from "src/app/models/global";
import { Bancoimg } from "src/app/models/banco.model";

@Component({
  selector: 'app-listcategorianoticias',
  templateUrl: './listcategorianoticias.component.html',
  styleUrls: ['./listcategorianoticias.component.css'],
  providers: [NoticiasService]
})
export class ListcategorianoticiasComponent implements OnInit {

  public titulo: string;
  public noticias_categoria: any[];
  public tipo : any[];

  constructor(private _ns: NoticiasService,
              private _g: GlobalsService,
              private _router: Router,
              private _route: ActivatedRoute) { 
    this.titulo = "Categoria Noticia";
  }

  ngOnInit() {

    this.getTipo();
    this.getDetail();
  }

  getTipo() {
    this._g.getTipo().subscribe(result => {
      if (result.code != 200) {
        console.log(result);
      } else {
        this.tipo = result.mensaje;
        //console.log(result.mensaje);
      }
    });
  }

  getDetail(){

    Swal.fire({
      
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor'

    });
    Swal.showLoading();

    this._route.params.forEach((params: Params) =>{
      let id = params["id"];

      this._ns.getListCategoriaNoticia(id).subscribe(
        resp =>{
          if (resp.code == 200) {

            this.noticias_categoria = resp.mensaje;
            console.log(this.noticias_categoria);
            Swal.close();

          } else{

            Swal.fire({
      
              allowOutsideClick: false,
              icon: 'warning',
              title: 'Categoria Noticias',
              text: resp.mensaje
        
            });
            //this._router.navigateByUrl("noticias");

          }
        },
        err =>{
          console.log(err);
        }
      )
    });
  }

}
