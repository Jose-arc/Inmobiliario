import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalsService } from 'src/app/services/globals.service';

import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // usuario: UsuarioModel = new UsuarioModel();
  email : any;
  password : any;
  recordarme = true;

  constructor( private auth:AuthService,
               private router:Router,
               private _g: GlobalsService ) { }

  ngOnInit() {

    if (localStorage.getItem('email')) {
      this.email = localStorage.getItem('email');
      this.recordarme = true;
    }

  }

  login( form: NgForm ){

    if ( form.invalid ) { return; }

    let user = this.email;
    let pass = this.password;
    
    let data = {
      user : user,
      pass : pass,
      key : '3d524a53c110e4c22463b10ed32cef9d'
    }

    this._g.getMessage("Espere por favor","info","");
    Swal.showLoading();

    this.auth.login( data )
      .subscribe( resp =>{
        
        let err = resp['mensaje'];

        if (resp['code'] != "200") {
          this._g.getMessage(err,"error","Proceso de login");
        }
        
        else{

        //enviar account a home
        this.sendAccount(resp['data']);
        //end

        let token = resp['data']['token'];
        this.auth.guardarToken(token);

        Swal.close();

        //Almacenar en el localstorage el usuario para que lo recuerde
        if (this.recordarme) {
          localStorage.setItem('email', this.email);
        }
        //End

        this.router.navigateByUrl('/home');
      }
        
        },(err) =>{
        //console.log(err);
        this._g.getMessage(err,"error","Proceso de login");
      });

  }

  sendAccount(data : any){
    this.auth.setAccount(data);
  }

}
