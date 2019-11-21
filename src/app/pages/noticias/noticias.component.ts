import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {

  public titulo : string;

  constructor() { 

    this.titulo = 'Noticias';

  }

  ngOnInit() {
  }

}
