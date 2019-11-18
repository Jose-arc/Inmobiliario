import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';

import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  recordarme = true;

  constructor( private auth:AuthService,
               private router:Router ) { }

  ngOnInit() {

    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }

  }

  login( form: NgForm ){

    if ( form.invalid ) { return; }

    Swal.fire({
      
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor'

    });
    Swal.showLoading();

    this.auth.login( this.usuario )
      .subscribe( resp =>{

        console.log(resp);
        Swal.close();

        //Almacenar en el localstorage el usuario para que lo recuerde
        if (this.recordarme) {
          localStorage.setItem('email', this.usuario.email);
        }
        //End

        this.router.navigateByUrl('/home');

      },(err) =>{

        console.log(err.error.error.message);
        Swal.fire({
      
          allowOutsideClick: false,
          icon: 'error',
          title: 'Error en login',
          text: err.error.error.message
    
        });

      });

  }

}
