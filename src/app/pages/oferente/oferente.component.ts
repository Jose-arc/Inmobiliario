import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-oferente',
  templateUrl: './oferente.component.html',
  styleUrls: ['./oferente.component.css']
})
export class OferenteComponent implements OnInit {

  public titulo : string;

  constructor() { 

    this.titulo = 'Oferentes';

  }

  ngOnInit() {
  }

}
