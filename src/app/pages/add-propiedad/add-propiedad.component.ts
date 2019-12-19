import { Component, OnInit, EventEmitter} from '@angular/core';

//Imports
import { Router } from "@angular/router";
import { PropiedadesService } from "src/app/services/propiedades.service";
import { Propiedad } from "src/app/models/propiedad.model";
import { GlobalsService } from "src/app/services/globals.service";
import Swal from "sweetalert2";
import { GLOBAL } from "src/app/models/global";
import { Bancoimg } from "src/app/models/banco.model";

import L from 'leaflet'; 
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';


@Component({
  selector: 'app-add-propiedad',
  templateUrl: './add-propiedad.component.html',
  styleUrls: ['./add-propiedad.component.css'],
  providers: [PropiedadesService]
})
export class AddPropiedadComponent implements OnInit {

  public propiedad : Propiedad;
  public banco : Bancoimg;
  public archivosParaSubir;
  public resultadoSubida;
  public selected = [];
  public selectedGaleria = [];
  selectedChange: EventEmitter<any> = new EventEmitter();
  public bancoImg: any[];
  //Array de subir imagen al BD
  public img: any[];
  public titleBoton : string;

  //Return de Vistas
  public tipopropiedad: any[];
  public formato : any[];
  public entrega : any[];

  //Map
  a : any;

  orden : any;

  //Variables del form
  public idPropiedad = this._ps.makeId();
  public fecha = this._g.fullFecha();

  constructor(private _ps : PropiedadesService,
              private _g : GlobalsService,
              private _router: Router) { 
                
                this.propiedad = new Propiedad("","81","","","","0","","","","",this._ps.makeId(),"","","","0","","","","","","","","0","","","","","",this.fecha,this.orden)
                this.titleBoton = "Añadir Propiedad";
              }

  ngOnInit() {
    this.getBancoImg();
    this.resultTipoPropiedad();
    this.resultEntrega();
    this.resultFormato();
    this.getMap();
    this.getNPropiedades();
    
  }

  onSubmit(){

    let pago;
    let lat: any;
    let lng: any ;

    //Condiciones
    let islatLng = ( this.propiedad.lat == null && this.propiedad.lng == null ) ? 1 : 0;
    console.log(islatLng);

    if (this.propiedad.lat == null && this.propiedad.lng == null) {
      
      this._g.getMessage("Seleccione punto en el mapa", "Warning", "Faltan Campos por llenar");

      lat = "-33.4379";
      lng = "-70.6504";
      console.log("-- Map by defect --");
    }

    if (this.propiedad.ispago) {
      pago = "1";
    }else{
      pago = "0";
    }

    this.propiedad.lat = (islatLng == 1) ? lat : this.a.latlng.lat.toString();
    this.propiedad.lng = (islatLng == 1) ? lng : this.a.latlng.lng.toString();

    this.propiedad.ispago = pago;

    this.propiedad.orden = this.orden;

    //console.log(this.propiedad);
    this.addPropiedad();
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

  toggleGaleria(value) {
    var index = this.selectedGaleria.indexOf(value);
    if (index === -1) this.selectedGaleria.push(value);
    else this.selectedGaleria.splice(index, 1);
    this.selectedChange.emit(this.selectedGaleria);
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

  selectModel() {
    this.img = this.selected;

    this.propiedad.modelos = this.img.toString();
  }

  selectGaleria() {
    this.img = this.selectedGaleria;

    this.propiedad.galeria = this.img.toString();
  }
  

  resultTipoPropiedad(){
    this._g.getTipoPropiedad().subscribe(
      result =>{
        if (result.code == 200) {
          this.tipopropiedad = result.mensaje;
        }
        else{
           console.log( result.mensaje );
        }
      },
      err =>{
        return console.log(err);
      }
    )
  }

  

  resultFormato(){
    this._g.getFormato().subscribe(
      result =>{
        if (result.code == 200) {
          this.formato = result.mensaje;
        }
        else{
          console.log( result.mensaje );
        }
      },
      err =>{
        return console.log(err);
      }
    )
  }

  resultEntrega(){

    this._g.getEntrega().subscribe(
      result =>{
        if (result.code == 200) {
          this.entrega = result.mensaje
        }
        else{
          console.log( result.mensaje );
        }
      },
      err =>{
        return console.log(err);
      }
    )
  }


  getMap():void{

  let map = L.map('map', {
  center: [-33.4379, -70.6504],
  zoom: 10
});

L.control.scale().addTo(map);

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const provider = new OpenStreetMapProvider();

new GeoSearchControl({
  provider: provider,                                 // required
  showMarker: true,                                   // optional: true|false  - default true
  showPopup: false,                                   // optional: true|false  - default false
  marker: {                                           // optional: L.Marker    - default L.Icon.Default
    icon: new L.Icon.Default(),
    draggable: false,
  },
  popupFormat: ({ query, result }) => result.label,   // optional: function    - default returns result label
  maxMarkers: 1,                                      // optional: number      - default 1
  retainZoomLevel: false,                             // optional: true|false  - default false
  animateZoom: true,                                  // optional: true|false  - default true
  autoClose: true,                                   // optional: true|false  - default false
  searchLabel: 'Ingrese ubicacion',                       // optional: string      - default 'Enter address'
  keepResult: true                                   // optional: true|false  - default false
}).addTo(map);


this.a = map.on('geosearch/showlocation', function(e){
  this.latlng = {lat: Number(e.location.y), lng: Number(e.location.x)}
});

$('#locate-position').on('click', function(){
  map.locate({setView: true, maxZoom: 15});
});

function onLocationFound(e) {
  var radius = e.accuracy / 2;
  L.marker(e.latlng).addTo(map)
  L.circle(e.latlng, radius).addTo(map);
  console.log("Posicion : " + e.latlng);
}

map.on('locationfound', onLocationFound);

function onLocationError(e) {
  alert(e.message);
}
map.on('locationerror', onLocationError);

  }

  addPropiedad(){
    this._ps.addPropiedad(this.propiedad).subscribe(
      result =>{
        if (result.code == 200) {
          Swal.close();
          this._router.navigateByUrl("/propiedades");
          //this._g.getMessage("Se añadio correctamente","success","Propiedad");
        }
        else {
            this._g.getMessage(result.mensaje,"warning","Error")
          }
      },
      err =>{
        console.log(err);
      }
    )
  }

  getNPropiedades(): void{

    let n;
    let b;
    let c;
    let numTotal;

    this._ps.getNPropiedades().subscribe(
      result =>{
        if (result.code == 200) {
          
          n = result.mensaje;
          b = n[0];
          c = parseInt(b['npropiedades']);
          numTotal = c + 1 ;
          //console.log(numTotal);
          this.orden = numTotal;
    
        } else {
          console.log(result.mensaje);
        }
      },
      err =>{
        console.log(err);
      }
    )

  }
  

}
