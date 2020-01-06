import { Component, OnInit, EventEmitter } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Propiedad } from "src/app/models/propiedad.model";
import { GlobalsService } from 'src/app/services/globals.service';
import { GLOBAL } from "src/app/models/global";
import { Bancoimg } from 'src/app/models/banco.model';
import Swal from "sweetalert2";
import { PropiedadesService } from 'src/app/services/propiedades.service';


import L from 'leaflet'; 
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';


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

   //Return de Vistas
   public tipopropiedad: any[];
   public formato : any[];
   public entrega : any[];

   //map
   a : any;

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
    this.resultEntrega();
    this.resultFormato();
    this.resultTipoPropiedad();
    //this.getMap();
  }

  onSubmit() {
    this.modificarPropiedad();
  }

  getDetalle() {
    this._route.params.forEach((params: Params) => {
      let id = params["id"];

      this._ps.getDetallePropiedad(id).subscribe(
        resp => {
          if (resp.code == 200) {
            this.propiedad = resp.data;
            let lat = parseFloat(this.propiedad.lat);
            let lng = parseFloat(this.propiedad.lng);
            
            this.getMap(lat,lng);


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

  modificarPropiedad() {
    this._route.params.forEach((params: Params) => {
      let id = params["id"];

      this._ps.updatePropiedad(id, this.propiedad).subscribe(
        result => {
          if (result.code == 200) {
            this._router.navigate(["/propiedades"]);
            //this._g.getMessage(result.mensaje,"success","Update listo");
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
            this._g.getMessage(error,"error","Error");
          }
        );
    }
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

  getMap(lat,lng){

    let map = L.map('map', {
    center: [lat, lng],
    zoom: 18
  });
  
  L.marker([lat, lng]).addTo(map);
  //L.control.scale().addTo(map);
  
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
    //var radius = e.accuracy / 2;
    //L.marker(e.latlng).addTo(map)
    //L.circle(e.latlng, radius).addTo(map);
    console.log("Posicion : " + e.latlng);
  }
  
  map.on('locationfound', onLocationFound);
  
  function onLocationError(e) {
    alert(e.message);
  }
  map.on('locationerror', onLocationError);
  
    }

}
