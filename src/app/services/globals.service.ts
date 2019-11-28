import { Injectable } from '@angular/core';

//Imports
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import  'rxjs/add/operator/map';
import { Observable, from } from 'rxjs';

//Global URL
import { GLOBAL } from '../models/global';


@Injectable({
  providedIn: 'root'
})
export class GlobalsService {

  constructor( public http : HttpClient ) { }

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

}


