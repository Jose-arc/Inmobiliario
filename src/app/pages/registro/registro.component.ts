import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { GlobalsService } from 'src/app/services/globals.service';
import { GLOBAL } from "src/app/models/global";
import { Bancoimg } from 'src/app/models/banco.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario : Usuario
  banco : Bancoimg;

  recordarme = true;
  public archivosParaSubir;
  public resultadoSubida;

  constructor( private auth: AuthService, 
               private router: Router,
               private _g: GlobalsService) {

  this.usuario = new Usuario("","","","","","","",auth.token(),"");
  
}

  ngOnInit() {

  }

  onSubmit( form: NgForm ){

    //parametros por defecto
    this.usuario.permiso = "0";
    this.usuario.verificacion = "0";

    if ( form.invalid ) { return; }

    //Subir img al folder del server
    this._g.getMessage("Espere por favor","info","");
    Swal.showLoading();

    if (this.archivosParaSubir && this.archivosParaSubir.length >= 1) {
      this._g
        .subirArchivo(GLOBAL.dev + "upload", [], this.archivosParaSubir)
        .then(
          result => {
            //console.log(result);
            this.resultadoSubida = result;
            //console.log(this.resultadoSubida.nomimagen);
            this.usuario.image = this.resultadoSubida.nomimagen;
            Swal.close();

            //Mandar parametros a la BD
            this.addRegistro();

          },
          error => {
            this._g.getMessage(error,"error","error");
            Swal.close();
          }
        );
    }else{

      //Enviar parametros a la BD sin img
      this.addRegistro();

    }

    //end
  
  }

  fileChangeEvent(fileInput: any) {
    this.archivosParaSubir = <Array<File>>fileInput.target.files;
    //console.log(this.archivosParaSubir);
  }

  addRegistro() {

    this.auth.nuevoUsuario( this.usuario ).subscribe( 
  
      resp =>{

        //console.log(resp);
        
        if (resp.code == 200) {
          
          Swal.close();

         //Almacenar en el localstorage el usuario para que lo recuerde
         if (this.recordarme) {
          localStorage.setItem('email', this.usuario.correo);
        }
        //End

        this.router.navigateByUrl('/login');

        } else {
          
          this._g.getMessage(resp.mensaje,"error","Error");

        }

      }, (err)=>{
        console.log(err);
      });
  
  }


}


