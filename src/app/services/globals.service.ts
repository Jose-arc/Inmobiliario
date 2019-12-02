import { Injectable } from '@angular/core';

//Imports
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
// import  'rxjs/add/operator/map';
import { Observable, from } from 'rxjs';

//Global URL
import { GLOBAL } from '../models/global';
import { Bancoimg } from '../models/banco.model';



@Injectable({
  providedIn: 'root'
})
export class GlobalsService {

    public api_rest: string;
    public api_rest_full: string;

  constructor( public http : HttpClient ) { 

    this.api_rest = GLOBAL.api_rest;

  }

  getFecha(){
    let date = new Date()

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    if(month < 10){
        return `${day}-0${month}-${year}`;
    }else{
        return `${day}-${month}-${year}`;
    }
  }

  subirArchivo(url:string, params: Array<string>,files: Array<File>){
    return new Promise((resolve,reject) =>{
        var formData: any = new FormData();
        var xhr = new XMLHttpRequest();

        for (let i = 0; i < files.length; i++) {
            
            formData.append('uploads',files[i], files[i].name);
            
        }

        xhr.onreadystatechange = function () {
            
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    resolve(JSON.parse(xhr.response))
                }else{
                    reject(xhr.response);
                }
            }

        };

        xhr.open("POST",url,true);
        xhr.send(formData);
    });
}

addbanco(banco: Bancoimg): Observable<any>{
    let json = JSON.stringify(banco);
    let params = "banco="+json;
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
     
    return this.http.post(this.api_rest+'banco', params, {headers: headers});
  }
  
  getBanco():Observable<any>{
    return this.http.get(this.api_rest+'banco');
  }
  
  getBancoDetalle(id):Observable<any>{
    return this.http.get(this.api_rest+'banco/'+id);
  }

}


