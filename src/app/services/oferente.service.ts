import { Injectable } from '@angular/core';

//Imports
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, from } from "rxjs";

//Global URL
import { GLOBAL } from "../models/global";

//Models
import { Oferente } from '../models/oferente.model';


@Injectable({
  providedIn: 'root'
})
export class OferenteService {
  public api: string;
  //public prod_full: string;

  constructor( public http: HttpClient ) { 

    this.api = GLOBAL.dev;
  }

  getOferente(): Observable<any> {
    return this.http.get(this.api + "oferente");
  }

  getDetalleOferente(id) : Observable<any> {
    return this.http.get(this.api + "oferente/" + id);
  }

  getListCategoriaOferente(id) : Observable<any> {
    return this.http.get(this.api + "categoriaoferente/" +id);
  }

  deleteOferente(id) : Observable<any> {
    return this.http.get(this.api + "oferente-delete/"+ id);
  }

  addOferente(oferente: Oferente): Observable<any> {
    let json = JSON.stringify(oferente);
    let params = "oferente=" + json;
    let headers = new HttpHeaders().set(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );

    return this.http.post(this.api + "oferente", params, {
      headers: headers
    });
  }

  updateOferente(id, oferente: Oferente): Observable<any>{
    let json = JSON.stringify(oferente);
    let params = "oferente=" + json;
    let headers = new HttpHeaders().set(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );
    return this.http.post(this.api + "oferente-update/" + id, params, {
      headers: headers
    });
  }

  makeId() {
    let result = "oferente-";
    let characters = "abcdefghijklmnopqrstvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < 7; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }



}
