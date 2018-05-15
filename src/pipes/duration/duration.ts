import {Pipe, PipeTransform} from '@angular/core';

/**
 * Generated class for the DurationPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: number, ...args) {
    let m = Math.floor(value / 60);
    let minute = m < 10 ? '0' + m : m;
    let s = Math.round(value % 60);
    let second = s < 10 ? '0' + s : s;
    return minute + ':' + second;
  }
}
