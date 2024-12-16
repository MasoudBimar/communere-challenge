/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Injectable } from '@angular/core';
import { MedicationModel } from '../model/medification.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class MedicationService {
  constructor(private storageService: StorageService) {
   }

  getMedications(searchFilter: string=''): MedicationModel[] {
    if (searchFilter.length > 0) {
      return this.storageService.getMedications()
        .filter(medication => medication.medicationName.toLowerCase().includes(searchFilter.toLowerCase()));
    } else {
      return this.storageService.getMedications();
    }
  }

  addMedications(medication: MedicationModel): MedicationModel[] {
    medication.id = self.crypto.randomUUID();
    const medications = this.storageService.getMedications();
    medications.push(medication);
    this.storageService.updateMedications(medications);
    return this.storageService.getMedications();
  }

  updateMedication(model: MedicationModel): MedicationModel[] {
    const medications = this.storageService.getMedications();
    const medicationIdx = medications.findIndex(medicationItem => medicationItem.id === model.id);
    if (medicationIdx !== -1) {
      medications[medicationIdx] = model;
    }
    this.storageService.updateMedications(medications);
    return this.storageService.getMedications();
  }

  removeMedication(medicationId: string) {
    const medications = this.storageService.getMedications();
    const medicationIdx = medications.findIndex(medicationItem => medicationItem.id === medicationId);
    if (medicationIdx !== -1) {
      medications.splice(medicationIdx,1);
    }
    this.storageService.updateMedications(medications);
  }
}
