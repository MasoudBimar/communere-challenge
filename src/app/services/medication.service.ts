/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Injectable, signal } from '@angular/core';
import { MedicationModel } from '../model/medification.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class MedicationService {
  medications = signal<MedicationModel[]>([])
  constructor(private storageService: StorageService) {
    this.getMedications();
  }

  getMedications(): void {
    this.medications.set(this.storageService.getMedications());
  }

  addMedications(medication: MedicationModel): void {
    medication.id = self.crypto.randomUUID();
    const medications = this.storageService.getMedications();
    medications.push(medication);
    this.storageService.updateMedications(medications);
    return this.getMedications();
  }

  updateMedication(model: MedicationModel): void {
    const medications = this.storageService.getMedications();
    const medicationIdx = medications.findIndex(medicationItem => medicationItem.id === model.id);
    if (medicationIdx !== -1) {
      medications[medicationIdx] = model;
    }
    this.storageService.updateMedications(medications);
    return this.getMedications();
  }

  removeMedication(medicationId: string) {
    const medicationIdx = this.medications().findIndex(medicationItem => medicationItem.id === medicationId);
    if (medicationIdx !== -1) {
      this.medications().splice(medicationIdx, 1);
      this.storageService.updateMedications(this.medications());
    }
  }
}
