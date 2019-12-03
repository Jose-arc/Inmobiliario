import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "firstimg"
})
export class FirstimgPipe implements PipeTransform {
  transform(value: string) {
    let cadena = value;
    let termino = ",";
    let posicion = cadena.indexOf(termino);

    if (posicion == -1) {
      return cadena;
    } else {
      let cadenaFinal = cadena.substring(0, posicion);

      return cadenaFinal;
    }
  }
}
