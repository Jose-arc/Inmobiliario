import { Injectable } from "@angular/core";

//Imports
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
// import  'rxjs/add/operator/map';
import { Observable, from } from "rxjs";

//Global URL
import { GLOBAL } from "../models/global";
import { Bancoimg } from "../models/banco.model";

@Injectable({
  providedIn: "root"
})
export class GlobalsService {
  public api_rest: string;
  public api_rest_full: string;

  constructor(public http: HttpClient) {
    this.api_rest = GLOBAL.api_rest;
  }

  getFecha() {
    let date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (month < 10) {
      return `${day}-0${month}-${year}`;
    } else {
      return `${day}-${month}-${year}`;
    }
  }

  fullFecha(){

    var nombres_dias = new Array('Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado');
    var nombres_meses = new Array('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre');
    var fecha_actual = new Date()

    var dia_mes = fecha_actual.getDate() //dia del mes
    var dia_semana = fecha_actual.getDay() //dia de la semana
    var mes = fecha_actual.getMonth() + 1
    var anio = fecha_actual.getFullYear()

    var fechaHora = new Date();
    var horas = fechaHora.getHours();
    var minutos = fechaHora.getMinutes();
    var segundos = fechaHora.getSeconds();
    var sufijo = 'AM';

    if(horas > 12) {
    horas = horas - 12;
    sufijo = 'PM';
    }

    if(horas < 10) { horas = 0 + horas; }
    if(minutos < 10) { minutos = 0 + minutos; }
    if(segundos < 10) { segundos = 0 + segundos; }

    return nombres_dias[dia_semana] + ", " + dia_mes + " de " + nombres_meses[mes - 1] + " de " + anio + ", "+ horas + ":"+minutos + " " + sufijo;
}

  subirArchivo(url: string, params: Array<string>, files: Array<File>) {
    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();

      for (let i = 0; i < files.length; i++) {
        formData.append("uploads", files[i], files[i].name);
      }

      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.open("POST", url, true);
      xhr.send(formData);
    });
  }

  addbanco(banco: Bancoimg): Observable<any> {
    let json = JSON.stringify(banco);
    let params = "banco=" + json;
    let headers = new HttpHeaders().set(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );

    return this.http.post(this.api_rest + "banco", params, {
      headers: headers
    });
  }

  getBanco(): Observable<any> {
    return this.http.get(this.api_rest + "banco");
  }

  getBancoDetalle(id): Observable<any> {
    return this.http.get(this.api_rest + "banco/" + id);
  }

  separadorImagenes(s) {
    let images = [];
    let cadena = s;
    let caracter = ",";
    let inicio = 0;
    let termino = cadena.length;

    for (let i = 0; i < cadena.length; i++) {
      if (cadena.charAt(i) == caracter) {
        // console.log("Numero donde esta la , :" + i);
        images.push(cadena.substring(inicio, i));
        inicio = i + 1;
      }
    }

    images.push(cadena.substring(inicio, termino));

    return images;
  }

  //Stored Procedures

  //End SP

  //Views

  getTipo(): Observable<any> {
    return this.http.get(this.api_rest + "tipo");
  }

  //End Views
  
}
