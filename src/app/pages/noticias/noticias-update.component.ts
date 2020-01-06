import { Component, OnInit, EventEmitter } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { NoticiasService } from "src/app/services/noticias.service";
import { Noticias } from "src/app/models/noticias.model";
import { GlobalsService } from 'src/app/services/globals.service';
import { GLOBAL } from "src/app/models/global";
import Swal from "sweetalert2";
import { Bancoimg } from 'src/app/models/banco.model';


@Component({
  selector: "noticia-update",
  templateUrl: "../add-noticias/add-noticias.component.html",
  styleUrls: ["../add-noticias/add-noticias.component.css"],
  providers: [NoticiasService]
})
export class NoticiaUpdateComponent {
  public noticias: Noticias;
  public banco: Bancoimg;
  public titleBoton;
  public bancoImg: any[];
  public archivosParaSubir;
  public resultadoSubida;
  public selected = [];

  selectedChange: EventEmitter<any> = new EventEmitter();

  constructor(
    private _ns: NoticiasService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _g: GlobalsService
  ) {
    this.noticias = new Noticias("", "", "", "", "", "","","","");
    this.titleBoton = "Modificar noticia";
  }

  ngOnInit() {
    this.getDetalle();
    this.getBancoImg();
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

  getBancoImg() {
    this._g.getBanco().subscribe(
      result => {
        if (result.code != 200) {
          console.log(result);
        } else {
          this.bancoImg = result.mensaje;
          console.log(this.bancoImg);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  guardarImg() {
    this._g.addbanco(this.banco).subscribe(
      result => {
        if (result.code == 200) {
          console.log(result.mensaje);
        } else {
          console.log(result);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  fileChangeEvent(fileInput: any) {
    this.archivosParaSubir = <Array<File>>fileInput.target.files;
    console.log(this.archivosParaSubir);
  }

  toggle(value) {
    var index = this.selected.indexOf(value);
    if (index === -1) this.selected.push(value);
    else this.selected.splice(index, 1);
    this.selectedChange.emit(this.selected);
  }

  uploadFileBD() {
    Swal.fire({
      allowOutsideClick: false,
      icon: "info",
      text: "Espere por favor"
    });
    Swal.showLoading();

    if (this.archivosParaSubir && this.archivosParaSubir.length >= 1) {
      this._g
        .subirArchivo(GLOBAL.dev + "upload", [], this.archivosParaSubir)
        .then(
          result => {
            //console.log(result);
            this.resultadoSubida = result;
            console.log(this.resultadoSubida);
            this.banco.nombre = this.resultadoSubida.nomimagen;

            this.guardarImg();

            Swal.close();
          },
          error => {
            Swal.fire({
              allowOutsideClick: false,
              icon: "error",
              title: "Error",
              text: error
            });
          }
        );
    }
  }

}
