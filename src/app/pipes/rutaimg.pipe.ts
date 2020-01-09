import { Pipe, PipeTransform } from '@angular/core';
import { GLOBAL } from 'src/app/models/global';

@Pipe({
  name: 'rutaimg'
})
export class RutaimgPipe implements PipeTransform {

  //prod
  //ruta = GLOBAL.img_prod;
  
  //dev
  ruta = GLOBAL.img_dev;

  transform(img): any {
    
    let nomImg = img;
    let result = this.ruta + nomImg;
    return result;
  }

}
