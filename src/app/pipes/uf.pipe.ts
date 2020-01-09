import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uf'
})
export class UfPipe implements PipeTransform {

  transform(UF){

    let value = parseInt(UF);
    let result = Math.trunc(value);
    return result;

}

}
