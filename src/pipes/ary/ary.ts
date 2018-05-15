import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the AryPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'ary',
})
export class AryPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any, ...args) {
    if(Number.isInteger(value)){
      return value>=10000?Math.floor(value/10000)+'万':value ;
    }else{
      return value;
    }

  }
}
