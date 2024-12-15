import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MedicationModel, UnitEnum } from '../model/medification.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
    if (!localStorage.getItem('medications')) {
      localStorage.setItem('medications', JSON.stringify(
        [
          {id: self.crypto.randomUUID(), medicationName: 'Aspirin1', dosage: 3 , dosageUnit: UnitEnum.Capsules,day: ['Wednesday'], frequency:['18:21'], issueDate: '2024/01/24'},
          {id: self.crypto.randomUUID(), medicationName: 'Aspirin2', dosage: 4 , dosageUnit: UnitEnum.Drops,day: ['Wednesday'], frequency:['16:00'], issueDate: '2024/01/24'}
        ] as MedicationModel[]
      ))
    }
   }

  getMedications(): Observable<MedicationModel[]>{
    const rawData = localStorage.getItem('medications');
    if (rawData) {
      return of(JSON.parse(rawData) as  MedicationModel[]);
    }
    return of([]);
  }

  updateMedications(medications: MedicationModel[]): void{
    localStorage.setItem('medications', JSON.stringify(medications));
  }
}
