import { Injectable } from '@angular/core';

//Imports
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, from } from "rxjs";

//Global URL
import { GLOBAL } from "../models/global";

//Model
import { Propiedad } from './../models/propiedad.model';

import { GlobalsService } from 'src/app/services/globals.service';


@Injectable({
  providedIn: 'root'
})
export class PropiedadesService {
  
  public api: string;
  //public prod_full: string;

  constructor( public http: HttpClient,
                private _g: GlobalsService ) {

    this.api = GLOBAL.dev;

   }

  getPropiedad(): Observable<any> {
    return this.http.get(this.api + "propiedades");
  }

  getNPropiedades(): Observable<any> {
    return this.http.get(this.api + "npropiedades");
  }

  getDetallePropiedad(id) : Observable<any> {
    return this.http.get(this.api + "propiedades/" + id);
  }

  deletePropiedad(id) : Observable<any> {
    return this.http.get(this.api + "propiedades-delete/"+ id);
  }

  addPropiedad(propiedad: Propiedad): Observable<any> {
    let json = JSON.stringify(propiedad);
    let params = "propiedades=" + json;
    let headers = new HttpHeaders().set(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );

    return this.http.post(this.api + "propiedades", params, {
      headers: headers
    });
  }

  updatePropiedad(id, propiedad: Propiedad): Observable<any>{
    let json = JSON.stringify(propiedad);
    let params = "propiedades=" + json;
    let headers = new HttpHeaders().set(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );
    return this.http.post(this.api + "propiedades-update/" + id, params, {
      headers: headers
    });
  }

  getPropiedadIsPago(): Observable<any> {
    return this.http.get(this.api + "propiedadespago");
  }

  getPropiedadNoPago(): Observable<any> {
    return this.http.get(this.api + "propiedadesnopago");
  }

  getFilter(data) : Observable<any>{
    return this.http.get(this.api + "filtro", {params: data});
  }

  makeId() {
    let result = "propiedades-";
    let characters = "abcdefghijklmnopqrstvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < 7; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  getUF():Observable<any>{

    return this.http.get(`https://mindicador.cl/api/uf/${this._g.getFecha()}`);
  }
  
}
