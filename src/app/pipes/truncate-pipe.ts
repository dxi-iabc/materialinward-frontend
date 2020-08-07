import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit = 25, completeWords = false, ellipsis = '...') {
    if ( value && value.length > 15)  {
      limit = value.substr(0, 13).lastIndexOf(' ');
      if(limit < 1) limit = 9;
      return `${value.substr(0, limit)}${ellipsis}`;
    } return`${value}`;
    
  }
}
