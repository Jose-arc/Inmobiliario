import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";
import { PropiedadesService } from "src/app/services/propiedades.service";
import { Propiedad } from "src/app/models/propiedad.model";
import { GlobalsService } from "src/app/services/globals.service";
import Swal from "sweetalert2";
import { GLOBAL } from "src/app/models/global";
import { Bancoimg } from "src/app/models/banco.model";

import L from 'leaflet'; 
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

import { map, filter } from 'rxjs/operators';
import { pipe, of } from 'rxjs';

@Component({
  selector: 'app-propiedades',
  templateUrl: './propiedades.component.html',
  styleUrls: ['./propiedades.component.css'],
  providers: [PropiedadesService]
})
export class PropiedadesComponent implements OnInit {

  public titulo : string;
  
  propiedades: Propiedad;

  //form filter
  p : any[] = []; //Array para hacer el filter()
  comuna : any;
  tipoprop : any;
  tipoform : any;
  tipoentr : any;
  //end

  constructor(
    private _ps: PropiedadesService,
    private _g: GlobalsService,
    private _router: Router
  ) { 

    this.titulo = 'Propiedades';

  }

  ngOnInit() {
    this.getPropiedades();
  }

  getPropiedades(){

    this._g.getMessage("Espere por favor","info","");
    Swal.showLoading();

    this._ps.getPropiedad().subscribe(
      result =>{
        if (result.code == 200) {
          
          this.propiedades = result.mensaje;
          this.p = result.mensaje;
          console.log(this.propiedades);
          Swal.close();

        } else {
          this._g.getMessage(result.mensaje,"warning","Propiedades");
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
          this.deletePropiedad(id);

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

  deletePropiedad(id) {
    this._ps.deletePropiedad(id).subscribe(
      resp => {
        if (resp.code == 200) {
          this.getPropiedades();
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

  filter(){

    let isTipoProp = this.tipoprop;
    let isTipoform = this.tipoform;
    let isTipoEntr = this.tipoentr;
    let isComuna = this.comuna;

    let query1 = this.p.filter(propiedad => propiedad.tipoprop === isTipoProp);
    let query2 = this.p.filter(propiedad => propiedad.tipoform === isTipoform);
    let query3 = this.p.filter(propiedad => propiedad.tipoentr === isTipoEntr);
    let query4 = this.p.filter(propiedad => propiedad.comuna === isComuna);

    this._g.getMessage(query4,"warning","Resultado query");
   
  }


}
