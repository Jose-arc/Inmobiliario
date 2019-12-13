import { Injectable } from '@angular/core';

//Imports
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, from } from "rxjs";

//Global URL
import { GLOBAL } from "../models/global";

//Model
import { Propiedad } from './../models/propiedad.model';


@Injectable({
  providedIn: 'root'
})
export class PropiedadesService {
  
  public api_rest: string;
  public api_rest_full: string;

  constructor( public http: HttpClient ) {

    this.api_rest = GLOBAL.api_rest;

   }

   getPropiedad(): Observable<any> {
    return this.http.get(this.api_rest + "propiedades");
  }

  getDetallePropiedad(id) : Observable<any> {
    return this.http.get(this.api_rest + "propiedades/" + id);
  }

  // getListCategoriaOferente(id) : Observable<any> {
  //   return this.http.get(this.api_rest + "categoriaoferente/" +id);
  // }

  deletePropiedad(id) : Observable<any> {
    return this.http.get(this.api_rest + "propiedades-delete/"+ id);
  }

  addPropiedad(propiedad: Propiedad): Observable<any> {
    let json = JSON.stringify(propiedad);
    let params = "propiedades=" + json;
    let headers = new HttpHeaders().set(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );

    return this.http.post(this.api_rest + "propiedades", params, {
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
    return this.http.post(this.api_rest + "propiedades-update/" + id, params, {
      headers: headers
    });
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
}
