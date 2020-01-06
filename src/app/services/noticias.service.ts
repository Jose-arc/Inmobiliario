import { Injectable } from "@angular/core";

//Imports
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
// import  'rxjs/add/operator/map';
import { Observable, from } from "rxjs";

//Global URL
import { GLOBAL } from "../models/global";

//Models
import { Noticias } from "../models/noticias.model";

@Injectable({
  providedIn: "root"
})
export class NoticiasService {
  public api: string;
  //public prod_full: string;

  constructor(public http: HttpClient) {
    this.api = GLOBAL.dev;
  }

  getNoticias(): Observable<any> {
    return this.http.get(this.api + "noticias");
  }

  getDetalleNoticia(id): Observable<any> {
    return this.http.get(this.api + "noticias/" + id);
  }

  getListCategoriaNoticia(id): Observable<any> {
    return this.http.get(this.api + "categorianoticia/" + id);
  }

  deleteNoticia(id): Observable<any> {
    return this.http.get(this.api + "noticias-delete/" + id);
  }

  addNoticias(noticias: Noticias): Observable<any> {
    let json = JSON.stringify(noticias);
    let params = "noticias=" + json;
    let headers = new HttpHeaders().set(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );

    return this.http.post(this.api + "noticias", params, {
      headers: headers
    });
  }

  updateNoticias(id, noticias: Noticias): Observable<any> {
    let json = JSON.stringify(noticias);
    let params = "noticias=" + json;
    let headers = new HttpHeaders().set(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );
    return this.http.post(this.api + "noticias-update/" + id, params, {
      headers: headers
    });
  }

  makeId() {
    let result = "news-";
    let characters = "abcdefghijklmnopqrstvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < 7; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
