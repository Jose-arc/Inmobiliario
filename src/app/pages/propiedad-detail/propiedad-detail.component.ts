import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from "@angular/router";

import { GlobalsService } from "src/app/services/globals.service";
import Swal from "sweetalert2";
import { PropiedadesService } from '../../services/propiedades.service';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Propiedad } from '../../models/propiedad.model';

import L from 'leaflet';


@Component({
  selector: 'app-propiedad-detail',
  templateUrl: './propiedad-detail.component.html',
  styleUrls: ['./propiedad-detail.component.css']
})
export class PropiedadDetailComponent implements OnInit {

  public propiedad_detail : Propiedad;
  public imgs : any[];

  constructor(
    private _ps : PropiedadesService,
    private _g : GlobalsService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _sanitizer: DomSanitizer

  ) { }

  ngOnInit() {
    this.getDetail();
  }

  getDetail() {

    this._g.getMessage("Espere por favor","info","");
    Swal.showLoading();

    this._route.params.forEach((params: Params) => {
      let id = params["id"];

      this._ps.getDetallePropiedad(id).subscribe(
        resp => {
          if (resp.code == 200) {
            this.propiedad_detail = resp.data;

            let lat = parseFloat(this.propiedad_detail.lat);
            let lng = parseFloat(this.propiedad_detail.lng);

            this.getMap(lat,lng);

            //this.imgs = this._g.separadorImagenes(resp.data.imagen);
            Swal.close();
            // console.log(this.noticia_detail);
            // console.log(this.imgs);
          } else {
            this._router.navigateByUrl("propiedades");
          }
        },
        err => {
          console.log(<any>err);
          this._router.navigateByUrl("propiedades");
        }
      );
    });
  }

  //Insertar video de youtube
  getVideoIframe(url) {
    var video, results;
 
    if (url === null) {
        return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video   = (results === null) ? url : results[1];
 
    return this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);   
}

getMap(lat,lng){

  let map = L.map('map', {
    center: [lat, lng],
    zoom: 18,
    dragging: false,
    doubleClickZoom: false
  });

  let mapCenter = L.map('mapCenter',{
    center: [lat,lng],
    zoom: 18,
    dragging: false,
    trackResize: false,
    doubleClickZoom: false
  })
  
  L.marker([lat, lng]).addTo(map);
  //L.control.scale().addTo(map);
  
  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  L.marker([lat, lng]).addTo(mapCenter);
  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(mapCenter);

}


}
