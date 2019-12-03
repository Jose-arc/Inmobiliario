import { Component, OnInit } from '@angular/core';

// Imports
import { Router } from '@angular/router';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Noticias } from 'src/app/models/noticias.model';
import { GlobalsService } from 'src/app/services/globals.service';
import Swal from 'sweetalert2';
import { GLOBAL } from 'src/app/models/global';
import { Bancoimg } from 'src/app/models/banco.model';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css'],
  providers: [NoticiasService]
})
export class NoticiasComponent implements OnInit {

  public titulo : string;
  public noticias : any[];

  constructor(private _ns: NoticiasService,
              private _g: GlobalsService,
              private _router: Router) { 

    this.titulo = 'Noticias';

  }

  ngOnInit() {

    this.getNoticias();

  }

  getNoticias(){
    this._ns.getNoticias().subscribe(
      result =>{
        if (result.code != 200) {
          console.log(result);
        }else{

          this.noticias = result.mensaje;
          console.log(result.mensaje);

        }
      }
    );
  }

}
