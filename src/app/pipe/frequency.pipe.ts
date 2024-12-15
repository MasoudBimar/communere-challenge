import { Pipe, PipeTransform } from '@angular/core';
import { MedicationModel } from '../model/medification.model';

@Pipe({
  name: 'frequencyPipe'
})
export class FrequencyPipe implements PipeTransform {

  transform(value: MedicationModel): string {
    console.log("🚀 ~ FrequencyPipe ~ transform ~ value:", value)
    return `Every ${value.day.join(', ')} at ${value?.frequency?.join(' and ')}`;
  }

}
