import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'urlimg'
})
export class UrlimgPipe implements PipeTransform {


  transform(img){

    let url = 'http://localhost/bd/api-rest/img-uploads/'+img;

    return url;
  }

}
