import { Component, OnInit } from '@angular/core';

// Imports
import { Router, ActivatedRoute, Params } from "@angular/router";
import { OferenteService } from "src/app/services/oferente.service";
import { Oferente } from "src/app/models/oferente.model";
import { GlobalsService } from "src/app/services/globals.service";
import Swal from "sweetalert2";
import { GLOBAL } from "src/app/models/global";
import { Bancoimg } from "src/app/models/banco.model";

@Component({
  selector: 'app-listcategoriaoferente',
  templateUrl: './listcategoriaoferente.component.html',
  styleUrls: ['./listcategoriaoferente.component.css'],
  providers: [OferenteService]
})
export class ListcategoriaoferenteComponent implements OnInit {

  public titulo : string;
  public oferente_categoria: any[];
  public tipo : any[];
  public detailById : Oferente; 

  constructor(private _os: OferenteService,
              private _g: GlobalsService,
              private _router: Router,
              private _route: ActivatedRoute) { 

                this.titulo = "Categoria Oferente";

              }

  ngOnInit() {

    this.getTipo();
    this.getDetail();
  }

  getTipo(){
    this._g.getTipo().subscribe(
      result =>{
        if (result.code == 200) {
          this.tipo = result.mensaje;
        } else {
          console.log(result.mensaje);
        }
      },
      err =>{
        console.log(err);
      }
    )
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
      this._os.getListCategoriaOferente(id).subscribe(
        resp =>{
          if (resp.code == 200) {
            
            this.oferente_categoria = resp.mensaje;
            console.log(this.oferente_categoria);
            Swal.close();

          } else {
            Swal.fire({
      
              allowOutsideClick: false,
              icon: 'warning',
              title: 'Categoria Oferente',
              text: resp.mensaje
        
            });
          }
        },
        err =>{
          console.log(err);
        }
      )
    });
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

}
