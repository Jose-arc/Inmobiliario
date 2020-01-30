import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";
import { PropiedadesService } from "src/app/services/propiedades.service";
import { Propiedad } from "src/app/models/propiedad.model";
import { GlobalsService } from "src/app/services/globals.service";
import Swal from "sweetalert2";
import { GLOBAL } from "src/app/models/global";
import { AuthService } from 'src/app/services/auth.service';

//AutoComplete
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};
//end

@Component({
  selector: 'app-propiedades',
  templateUrl: './propiedades.component.html',
  styleUrls: ['./propiedades.component.css'],
  providers: [PropiedadesService]
})
export class PropiedadesComponent implements OnInit {

  //autoComplete
  stateForm: FormGroup = this._formBuilder.group({
    stateGroup: '',
  });

  stateGroups : any[];

  stateGroupOptions: Observable<any[]>;
  //end
  

  public titulo : string;
  
  propiedades: Propiedad;

  //form filter
  p : any[] = []; //Array para hacer el filter()
  comuna : any;
  tipoprop : any;
  tipoform : any;
  tipoentr : any;
  //end

  //Permisos
  permisos : any;

  public img : string;

  constructor(
    private _ps: PropiedadesService,
    private _g: GlobalsService,
    private _router: Router,
    private auth: AuthService,
    private _formBuilder: FormBuilder
  ) { 

    this.titulo = 'Propiedades';
    this.img = GLOBAL.img_dev;

  }

  ngOnInit() {
    this.getPropiedades();
    //this.permisos = JSON.parse(this.auth.getAccount());
    this.getCitys();
    
    this.stateGroupOptions = this.stateForm.get('stateGroup')!.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filterGroup(value))
      );
      
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

    let data = {
            prop : isTipoProp,
            form : isTipoform,
            entr : isTipoEntr,
            comuna : isComuna
          }
    

    this._g.getMessage("Espere por favor","info","");
    Swal.showLoading();

          //console.log(data);

          this._ps.getFilter(data).subscribe(
            result =>{
              if (result.code == 200) {
                Swal.close();

                this.propiedades = result.mensaje;

              }else{
                this._g.getMessage(result.mensaje,"warning","Filtro");
              }
            },
            err =>{
              console.log(err);
            }
          )
  }

  private _filterGroup(value: string): any[] {
    if (value) {
      return this.stateGroups
        .map(group => ({region: group.region, comunas: _filter(group.comunas, value)}))
        .filter(group => group.comunas.length > 0);
    }

    return this.stateGroups;
  }

  getCitys(){
    this._g.getCity().subscribe(
      resp =>{
        this.stateGroups = resp;
        console.log(this.stateGroups);
      },
      err =>{
        console.log(err);
      }
    )
  }


}
