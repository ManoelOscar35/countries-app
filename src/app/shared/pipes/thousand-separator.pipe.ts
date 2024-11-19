import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousandSeparator'
})
export class ThousandSeparatorPipe implements PipeTransform {
  transform(value: number): string {
    return value.toLocaleString('en-US').replace(/,/g, '.');
  }
}