import { Pipe, PipeTransform } from '@angular/core';
import { Column } from '@tanstack/angular-table';

@Pipe({
  name: 'headerDirection',
})
export class HeaderDirectionPipe implements PipeTransform {
  transform(value: Column<any>, ...args: unknown[]): string {
    const sortDir = value.getIsSorted();

    if (sortDir === 'asc') {
      return '▲';
    } else if (sortDir === 'desc') {
      return '▼';
    }

    return null;
  }
}
