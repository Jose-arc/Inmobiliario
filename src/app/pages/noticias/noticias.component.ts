import { Component, OnInit } from "@angular/core";

// Imports
import { Router } from "@angular/router";
import { NoticiasService } from "src/app/services/noticias.service";
import { Noticias } from "src/app/models/noticias.model";
import { GlobalsService } from "src/app/services/globals.service";
import Swal from "sweetalert2";
import { GLOBAL } from "src/app/models/global";
import { Bancoimg } from "src/app/models/banco.model";

@Component({
  selector: "app-noticias",
  templateUrl: "./noticias.component.html",
  styleUrls: ["./noticias.component.css"],
  providers: [NoticiasService]
})
export class NoticiasComponent implements OnInit {
  public titulo: string;
  public noticias: any[];
  public tipo : any[];

  constructor(
    private _ns: NoticiasService,
    private _g: GlobalsService,
    private _router: Router
  ) {
    this.titulo = "Noticias";
  }

  ngOnInit() {
    this.getNoticias();
    this.getTipo();
  }

  getNoticias() {

    this._g.getMessage("Espere por favor","info","");
    Swal.showLoading();

    this._ns.getNoticias().subscribe(result => {
      if (result.code != 200) {

        this._g.getMessage(result.mensaje,"warning","Categoria Noticias");

      } else {

        this.noticias = result.mensaje;
        Swal.close();
        
      }
    });
  }

  borrarConfirmado(id) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-sm btn-success",
        cancelButton: "btn btn-sm btn-danger"
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        title: "Estas seguro?",
        text: "Esta entrada se eliminara permanentemente de la Base de datos",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, Borrar",
        cancelButtonText: "No, Cancelar",
        reverseButtons: true
      })
      .then(result => {
        if (result.value) {
          this.deleteNoticia(id);

          swalWithBootstrapButtons.fire(
            "Eliminado!",
            "Tu entrada fue removida exitosamente.",
            "success"
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelado",
            "Sabia decisión el archivo quedo a salvo",
            "error"
          );
        }
      });
  }

  deleteNoticia(id) {
    this._ns.deleteNoticia(id).subscribe(
      resp => {
        if (resp.code == 200) {
          this.getNoticias();
        } else {
          Swal.fire({
            allowOutsideClick: false,
            icon: "error",
            title: "Error",
            text: resp.mensaje
          });
        }
      },
      err => {
        Swal.fire({
          allowOutsideClick: false,
          icon: "error",
          title: "Error",
          text: err
        });
      }
    );
  }

  getTipo() {
    this._g.getTipo().subscribe(result => {
      if (result.code != 200) {
        console.log(result);
      } else {
        this.tipo = result.mensaje;
        console.log(result.mensaje);
      }
    });
  }
}
