import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTime',
  standalone: true
})
export class DateTimePipe implements PipeTransform {

  constructor(private datePipe: DatePipe) { }

  transform(value: any, format: string = 'dd/MM/yyyy HH:mm:ss'): string | null {
    if (!value) return null;
    return this.datePipe.transform(value, format);
  }
}
