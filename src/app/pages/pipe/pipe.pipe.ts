import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipe'
})
export class PipePipe implements PipeTransform {

    transform(value: number): string {
        if (value != null) {
            return value.toLocaleString('fr-FR');
        }
        return '';
    }




}
