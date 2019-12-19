import { Component, OnInit, EventEmitter } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Propiedad } from "src/app/models/propiedad.model";
import { GlobalsService } from 'src/app/services/globals.service';
import { GLOBAL } from "src/app/models/global";
import { Bancoimg } from 'src/app/models/banco.model';
import Swal from "sweetalert2";
import { PropiedadesService } from 'src/app/services/propiedades.service';


@Component({
  selector: "propiedad-update",
  templateUrl: "../add-propiedad/add-propiedad.component.html",
  styleUrls: ["../add-propiedad/add-propiedad.component.css"],
  providers: [PropiedadesService]
})
export class PropiedadUpdateComponent {
  public propiedad: Propiedad;
  public banco: Bancoimg;
  public titleBoton;
  public bancoImg: any[];
  public archivosParaSubir;
  public resultadoSubida;
  public selected = [];

  selectedChange: EventEmitter<any> = new EventEmitter();

  constructor(
    private _ps: PropiedadesService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _g: GlobalsService
  ) {
    this.propiedad = new Propiedad("", "", "", "", "", "","","","","","","","","","","","","","","","","","","","","","","","",0);
    this.titleBoton = "Modificar propiedad";
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

      this._ps.getDetallePropiedad(id).subscribe(
        resp => {
          if (resp.code == 200) {
            this.propiedad = resp.data;
            console.log(this.propiedad);
          } else {
            this._router.navigate(["/propiedades"]);
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

      this._ps.updatePropiedad(id, this.propiedad).subscribe(
        result => {
          if (result.code == 200) {
            this._router.navigate(["/propiedades"]);
          } else {
            console.log(result);

            this._router.navigate(["/propiedad/" + id]);
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
    this._g.getMessage("Espere por favor","info","");
    Swal.showLoading();

    if (this.archivosParaSubir && this.archivosParaSubir.length >= 1) {
      this._g
        .subirArchivo(GLOBAL.api_rest + "upload", [], this.archivosParaSubir)
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
            this._g.getMessage(error,"error","Error");
          }
        );
    }
  }

}
