import { ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { MedicationComponent } from '../pages/medication/medication.component';
import { MedicationModel } from '../model/medification.model';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  openModal(viewContainerRef: ViewContainerRef, medicationModel?: MedicationModel): ComponentRef<MedicationComponent> {
    const commponentRef: ComponentRef<MedicationComponent> = viewContainerRef.createComponent(MedicationComponent);
    if (medicationModel) {
      commponentRef.instance.medicationModel = medicationModel;
    }
    return commponentRef;
  }
}
