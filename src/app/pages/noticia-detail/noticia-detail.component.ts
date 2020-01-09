import { Component, OnInit } from "@angular/core";

// Imports
import { Router, ActivatedRoute, Params } from "@angular/router";
import { NoticiasService } from "src/app/services/noticias.service";

import { GlobalsService } from "src/app/services/globals.service";
import Swal from "sweetalert2";
import { Noticias } from 'src/app/models/noticias.model';


@Component({
  selector: "app-noticia-detail",
  templateUrl: "./noticia-detail.component.html",
  styleUrls: ["./noticia-detail.component.css"]
})
export class NoticiaDetailComponent implements OnInit {
  
  public noticia_detail: Noticias;
  public imgs: any[];
  public categorias : any[];

  constructor(
    private _g: GlobalsService,
    private _ns: NoticiasService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getDetail();
    this.getTipo();
  }

  getDetail() {

    this._g.getMessage("Espere por favor","info","");
    Swal.showLoading();

    this._route.params.forEach((params: Params) => {
      let id = params["id"];

      this._ns.getDetalleNoticia(id).subscribe(
        resp => {
          if (resp.code == 200) {
            this.noticia_detail = resp.data;
            
            this.imgs = this._g.separadorImagenes(resp.data.imagen);
            Swal.close();
            // console.log(this.noticia_detail);
            // console.log(this.imgs);
          } else {
            this._router.navigateByUrl("noticias");
          }
        },
        err => {
          console.log(<any>err);
          this._router.navigateByUrl("noticias");
        }
      );
    });
  }

  getTipo(){

    this._g.getTipo().subscribe(result => {
      if (result.code != 200) {
        //console.log(result);
      } else {
        this.categorias = result.mensaje;
        //console.log(result.mensaje);
      }
    });

  }
}
