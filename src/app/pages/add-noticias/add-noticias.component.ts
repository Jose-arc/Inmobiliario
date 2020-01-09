import { Component, OnInit, EventEmitter } from "@angular/core";

// Imports
import { Router } from "@angular/router";
import { NoticiasService } from "src/app/services/noticias.service";
import { Noticias } from "src/app/models/noticias.model";
import { GlobalsService } from "src/app/services/globals.service";
import Swal from "sweetalert2";
import { GLOBAL } from "src/app/models/global";
import { Bancoimg } from "src/app/models/banco.model";

@Component({
  selector: "app-add-noticias",
  templateUrl: "./add-noticias.component.html",
  styleUrls: ["./add-noticias.component.css"],
  providers: [NoticiasService]
})
export class AddNoticiasComponent implements OnInit {
  public noticias: Noticias;
  public banco: Bancoimg;
  public archivosParaSubir;
  public resultadoSubida;
  public fechaActual;
  public fullFecha;
  public idNews;
  public bancoImg: any[];
  public tipo : any[];
  public selected = [];
  public titleBoton;

  //Array de subir imagen al BD
  public img: any[];

  selectedChange: EventEmitter<any> = new EventEmitter();

  constructor(
    private _ns: NoticiasService,
    private _g: GlobalsService,
    private _router: Router
  ) {
    this.fechaActual = _g.getFecha();
    this.fullFecha = _g.fullFecha();
    this.idNews = _ns.makeId();
    this.noticias = new Noticias("", this.idNews, "", "", "", this.fechaActual,"",this.fullFecha,"0");
    this.banco = new Bancoimg("", "");
    this.titleBoton = "Subir noticia";
  }

  ngOnInit() {
    this.getBancoImg();
    this.getTipo();
  }

  onSubmit() {
    console.log(this.noticias);

    Swal.fire({
      allowOutsideClick: false,
      icon: "info",
      text: "Espere por favor"
    });
    Swal.showLoading();

    this.addNewsletter();
  }

  addNewsletter() {
    this._ns.addNoticias(this.noticias).subscribe(
      result => {
        if (result.code == 200) {
          Swal.close();
          this._router.navigateByUrl("/noticias");
        } else {
          Swal.fire({
            allowOutsideClick: false,
            icon: "error",
            title: "Error",
            text: result.mensaje
          });
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  fileChangeEvent(fileInput: any) {
    this.archivosParaSubir = <Array<File>>fileInput.target.files;
    //console.log(this.archivosParaSubir);
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
            //console.log(this.resultadoSubida);
            this.banco.nombre = this.resultadoSubida.nomimagen;

            this.guardarImg();

            Swal.close();
          },
          error => {
            this._g.getMessage(error,"error","Problemas");
          }
        );
    }
  }

  guardarImg() {
    this._g.addbanco(this.banco).subscribe(
      result => {
        if (result.code == 200) {

           //refresh subida de imagen
           this.getBancoImg();
        } else {
          //console.log(result);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  getBancoImg() {
    this._g.getBanco().subscribe(
      result => {
        if (result.code != 200) {
          //console.log(result);
        } else {
          this.bancoImg = result.mensaje;
          //console.log(this.bancoImg);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  select() {
    this.img = this.selected;

    this.noticias.imagen = this.img.toString();
  }

  getTipo() {
    this._g.getTipo().subscribe(
      result => {
        if (result.code != 200) {
          this._g.getMessage(result.mensaje,"error","Categoria");
        } else {
           this.tipo = result.mensaje;
          //console.log(this.tipo);
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
