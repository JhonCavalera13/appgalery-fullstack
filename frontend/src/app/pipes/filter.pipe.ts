import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    if(arg == '' || arg.length < 2 ) return value;
    const resultImage = [];
    for(const image of value){
      if(image.name.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultImage.push(image)
      }
    }
    return resultImage;
  }

}
