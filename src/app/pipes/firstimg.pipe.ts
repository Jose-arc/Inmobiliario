import { Pipe, PipeTransform } from "@angular/core";

import { GLOBAL } from 'src/app/models/global';

@Pipe({
  name: "firstimg"
})
export class FirstimgPipe implements PipeTransform {

  //prod
  //ruta = GLOBAL.img_prod;
  
  //dev
  ruta = GLOBAL.img_dev;

  transform(value: string) {
    let cadena = value;
    let termino = ",";
    let posicion = cadena.indexOf(termino);

    if (posicion == -1) {
      return this.ruta + cadena;
    } else {
      let cadenaFinal = this.ruta + cadena.substring(0, posicion);
      
      return cadenaFinal;
    }
  }
}
