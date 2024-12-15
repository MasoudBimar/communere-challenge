/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MedicationModel } from '../model/medification.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class MedicationService {
  constructor(private storageService: StorageService) {
   }

  getMedications(searchFilter: string=''): Observable<MedicationModel[]> {
    console.log("🚀 ~ MedicationService ~ getMedications ~ searchFilter:", searchFilter)
    if (searchFilter.length > 0) {
      return this.storageService.getMedications().pipe(
        map((medications: MedicationModel[]) =>
          medications.filter(medication => medication.medicationName.toLowerCase().includes(searchFilter.toLowerCase())
          ))
      );
    } else {
      return this.storageService.getMedications();
    }
  }

  addMedications(medication: MedicationModel): Observable<any> {
    medication.id = self.crypto.randomUUID();
    this.storageService.getMedications().subscribe(medications => {
      medications.push(medication);
      this.storageService.updateMedications(medications);
    });
    return this.storageService.getMedications();
  }

  updateMedication(model: MedicationModel) {
    this.storageService.getMedications().subscribe(medications => {
      const medicationIdx = medications.findIndex(medicationItem => medicationItem.id === model.id);
      if (medicationIdx) {
        medications[medicationIdx] = model;
      }
      this.storageService.updateMedications(medications);
    });
    return this.storageService.getMedications();
  }

  removeMedication(medicationId: string) {
    this.storageService.getMedications().subscribe(medications => {
      const medicationIdx = medications.findIndex(medicationItem => medicationItem.id === medicationId);
      if (medicationIdx) {
        medications.splice(medicationIdx,1);
      }
      this.storageService.updateMedications(medications);
    });
    return this.storageService.getMedications();
  }
}
