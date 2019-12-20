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

@Component({
  selector: 'app-propiedades',
  templateUrl: './propiedades.component.html',
  styleUrls: ['./propiedades.component.css']
})
export class PropiedadesComponent implements OnInit {

  public titulo : string;

  constructor() { 

    this.titulo = 'Propiedades';

  }

  ngOnInit() {
  }

}
