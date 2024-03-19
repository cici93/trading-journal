import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unixTimespanToDate',
  standalone: true
})
export class UnixTimespanToDatePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    const locale = navigator.language || 'en-US';
    const milliseconds = value * 1000;
    // Create a new Date object
    const date = new Date(milliseconds);
    // Format the date as desired (for example, using toLocaleString)
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleString(locale,options)
  }

}
