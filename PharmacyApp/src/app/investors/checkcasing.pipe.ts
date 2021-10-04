import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkcasing'
})
export class CheckcasingPipe implements PipeTransform {

  transform(value:string, args?: any): any {
    
    //convert quater to uppercase and then combine the quater and year entered
    value=value.toUpperCase();
   value+=args;
    return value;
    
  }

}
