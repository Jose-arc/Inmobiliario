import { Component, OnInit, EventEmitter } from '@angular/core';

//Imports
import { Router } from "@angular/router";
import { OferenteService } from "src/app/services/oferente.service";
import { Oferente } from "src/app/models/oferente.model";
import { GlobalsService } from "src/app/services/globals.service";
import Swal from "sweetalert2";
import { GLOBAL } from "src/app/models/global";
import { Bancoimg } from "src/app/models/banco.model";

@Component({
  selector: 'app-add-oferente',
  templateUrl: './add-oferente.component.html',
  styleUrls: ['./add-oferente.component.css'],
  providers: [OferenteService]
})
export class AddOferenteComponent implements OnInit {
  
  public oferente : Oferente;
  public idOferente;
  public banco : Bancoimg;
  public archivosParaSubir;
  public resultadoSubida;
  public selected = [];
  selectedChange: EventEmitter<any> = new EventEmitter();
  public bancoImg: any[];
  //Array de subir imagen al BD
  public img: any[];
  public titleBoton : string;

  constructor(private _os: OferenteService,
              private _g: GlobalsService,
              private _router: Router) { 

                this.idOferente = _os.makeId();
                this.oferente = new Oferente("","","","","","","","0",this.idOferente,"");
                this.banco = new Bancoimg("","");
                this.titleBoton = 'Añadir Oferente';
              }

  ngOnInit() {
    this.getBancoImg();
  }

  onSubmit(){
    // console.log(this.oferente);
    
    Swal.fire({
      allowOutsideClick: false,
      icon: "info",
      text: "Espere por favor"
    });
    Swal.showLoading();

    this.addOferente();
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

  select() {
    this.img = this.selected;

    this.oferente.image_oferente = this.img.toString();
  }

  addOferente(){
    this._os.addOferente(this.oferente).subscribe(
      result =>{
        if (result.code == 200) {

          Swal.close();
          this._router.navigateByUrl("/oferente");

        } else {
          
          Swal.fire({
            allowOutsideClick: false,
            icon: "error",
            title: "Error",
            text: result.mensaje
          });

        }

      },err =>{
        console.log(err);
      }
    )
  }

}
