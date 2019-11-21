import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-propiedades',
  templateUrl: './propiedades.component.html',
  styleUrls: ['./propiedades.component.css']
})
export class PropiedadesComponent implements OnInit {

  public titulo : string;

  constructor() { 

    this.titulo = 'Propiedades';

  }

  ngOnInit() {
  }

}
