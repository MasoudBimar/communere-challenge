import { Pipe, PipeTransform } from '@angular/core';
import { MedicationModel } from '../model/medification.model';

@Pipe({
  name: 'frequencyPipe'
})
export class FrequencyPipe implements PipeTransform {

  transform(value: MedicationModel): string {
    return `Every ${(value.day.length > 6) ? ' day ': value.day.join(', ')} at ${value?.frequency?.join(' and ')}`;
  }

}
