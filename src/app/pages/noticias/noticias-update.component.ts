import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { NoticiasService } from "src/app/services/noticias.service";
import { Noticias } from "src/app/models/noticias.model";

@Component({
  selector: "noticia-update",
  templateUrl: "../add-noticias/add-noticias.component.html",
  styleUrls: ["../add-noticias/add-noticias.component.css"],
  providers: [NoticiasService]
})
export class NoticiaUpdateComponent {
  public noticias: Noticias;
  public titleBoton;

  constructor(
    private _ns: NoticiasService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.noticias = new Noticias("", "", "", "", "", "","","","");
    this.titleBoton = "Modificar noticia";
  }

  ngOnInit() {
    this.getDetalle();
  }

  onSubmit() {
    this.modificarNoticia();
  }

  getDetalle() {
    this._route.params.forEach((params: Params) => {
      let id = params["id"];

      this._ns.getDetalleNoticia(id).subscribe(
        resp => {
          if (resp.code == 200) {
            this.noticias = resp.data;
            console.log(this.noticias);
          } else {
            this._router.navigate(["/noticias"]);
          }
        },
        err => {
          console.log(<any>err);
        }
      );
    });
  }

  modificarNoticia() {
    this._route.params.forEach((params: Params) => {
      let id = params["id"];

      this._ns.updateNoticias(id, this.noticias).subscribe(
        result => {
          if (result.code == 200) {
            this._router.navigate(["/noticias"]);
          } else {
            console.log(result);

            this._router.navigate(["/noticia/" + id]);
          }
        },
        err => {
          console.log(<any>err);
        }
      );
    });
  }
}
