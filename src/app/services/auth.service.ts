import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from '../models/global';
// import { GlobalsService } from 'src/app/services/globals.service';

// import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public api : string;
  userToken: string;

  constructor( private http: HttpClient) {
    this.api = GLOBAL.dev;
    this.leerToken();
   }


  login(data){
    return this.http.get(this.api + "login", {params: data}).pipe( 
      map(resp =>{

        return resp;
      },
      err =>{
        console.log(err);
      })
    );
  }

  setAccount(object : any){

    let data = {
      "favoritos" : object['favoritos'],
      "permiso": object['permiso'],
      "verificacion": object['verificacion'],
      "name": object['name'],
      "correo": object['correo'],
      "token": object['token'],
      "image": object['image']
    }

    localStorage.setItem('account', JSON.stringify(data));
  }

  getAccount(){
    //return this.account;
    return localStorage.getItem('account');
  }

  nuevoUsuario(usuario: Usuario): Observable<any> {
    let json = JSON.stringify(usuario);
    let params = "register=" + json;
    let headers = new HttpHeaders().set(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );

    return this.http.post(this.api + "register", params, {
      headers: headers
    });
  }

  public guardarToken( idToken: string ){

    this.userToken = idToken;
    localStorage.setItem('token',idToken);

    let hoy = new Date();
    hoy.setSeconds( 3600 );

    localStorage.setItem('expira', hoy.getTime().toString() );

  }

  

  estaAutenticado(): boolean{

    if (this.userToken.length < 2 ) {
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if ( expiraDate > new Date()) {
      return true;
    }else{
      return false;
    }

  }

  leerToken(){

    if ( localStorage.getItem('token') ) {
      
      this.userToken = localStorage.getItem('token');

    }else{

      this.userToken = '';

    }

    return this.userToken;

  }

  token() {
    let result = "";
    let characters = "abcdefghijklmnopqrstvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < 24; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  logout(){ 
    localStorage.removeItem('token');
    localStorage.removeItem('account');
  }

}
