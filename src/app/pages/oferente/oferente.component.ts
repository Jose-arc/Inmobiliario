import { Component, OnInit, EventEmitter } from '@angular/core';

import { Router } from "@angular/router";
import { OferenteService } from "src/app/services/oferente.service";
import { Oferente } from "src/app/models/oferente.model";
import { GlobalsService } from "src/app/services/globals.service";
import Swal from "sweetalert2";
import { GLOBAL } from "src/app/models/global";
import { Bancoimg } from "src/app/models/banco.model";

@Component({
  selector: 'app-oferente',
  templateUrl: './oferente.component.html',
  styleUrls: ['./oferente.component.css'],
  providers: [OferenteService]
})
export class OferenteComponent implements OnInit {

  public titulo : string;
  public oferentes : any[];
  public tipo : any[];
  public detailById : Oferente;
  public rutaRelativaImg;

  

  constructor(private _os: OferenteService,
              private _g: GlobalsService,
              private _router: Router) { 

    this.titulo = 'Oferentes';
    

  }

  ngOnInit() {
    this.getOferente();
    this.getTipo();
  }

  

  getTipo() {
    this._g.getTipo().subscribe(
      result => {
        if (result.code != 200) {
          console.log(result);
        } else {
          this.tipo = result.mensaje;
          console.log(this.tipo);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  

  getOferente(){

    Swal.fire({
      allowOutsideClick: false,
      icon: "info",
      text: "Espere por favor"
    });
    Swal.showLoading();

    this._os.getOferente().subscribe(
      result =>{

        if (result.code == 200) {
          
          this.oferentes = result.mensaje;
          Swal.close();

        } else {
          
          Swal.fire({
            allowOutsideClick: false,
            icon: "error",
            title: "Error",
            text: result.mensaje
          });

        }

      },
      err =>{
        console.log(err);
      }
    )
  }

  detail(id){

    Swal.fire({
      allowOutsideClick: false,
      icon: "info",
      text: "Espere por favor"
    });
    Swal.showLoading();

    this._os.getDetalleOferente(id).subscribe(

      result =>{

        if (result.code == 200) {
          
          this.detailById = result.data;
          console.log(this.detailById);

          //Pegar los datos al HTML
          document.getElementById('rut').innerHTML = this.detailById.rut;
          document.getElementById('nombre').innerHTML = this.detailById.nombre;
          document.getElementById('direccion').innerHTML = this.detailById.direccion;
          document.getElementById('email').innerHTML = this.detailById.email;
          document.getElementById('telefono').innerHTML = this.detailById.telefono;
          document.getElementById('siteweb').innerHTML = this.detailById.siteweb;
      
          //End
          Swal.close();
        }else{

          Swal.fire({
            allowOutsideClick: false,
            icon: "error",
            title: "Error",
            text: result.mensaje
          });

        }
      },
      err =>{
        console.log(err);
      }

    )

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
          this.deleteOferente(id);

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

  deleteOferente(id){

    this._os.deleteOferente(id).subscribe(

      result =>{

        if (result.code == 200) {
          
          this.getOferente();

        }else{

          Swal.fire({
            allowOutsideClick: false,
            icon: "error",
            title: "Error",
            text: result.mensaje
          });

        }
      },
      err =>{
        console.log(err);
      }

    )

  }

}
