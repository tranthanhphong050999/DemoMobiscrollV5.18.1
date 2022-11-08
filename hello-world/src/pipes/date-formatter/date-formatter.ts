import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns';
/**
 * Generated class for the DateFormatterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'dateFormatter',
})
export class DateFormatterPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any, ...args) {
    let fmt : string
    if (args && args.length > 0) {
      fmt = args[0]
    }
    return format(value, fmt ||'YYYY/MM/DD')
  }
}
