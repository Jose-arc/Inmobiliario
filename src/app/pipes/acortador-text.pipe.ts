import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'acortadorText'
})
export class AcortadorTextPipe implements PipeTransform {

  transform(value: string){
    
    let text = value;
    if (text.length > 50) {
      
      let aOK = text.substring(0,100) + '...';
      text = aOK;

      return text;
    }

    return text;
    
  }

}
