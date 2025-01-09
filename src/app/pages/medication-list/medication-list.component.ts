/* eslint-disable @typescript-eslint/no-inferrable-types */
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { Component, ComponentRef, computed, OnInit, signal, ViewChild, ViewContainerRef } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { MedicationModel } from '../../model/medification.model';
import { FrequencyPipe } from '../../pipe/frequency.pipe';
import { MedicationService } from '../../services/medication.service';
import { ModalService } from '../../services/modal.service';
import { MedicationComponent } from '../medication/medication.component';

@Component({
  selector: 'app-medication-list',
  imports: [FrequencyPipe, DatePipe, NgOptimizedImage],
  templateUrl: './medication-list.component.html',
  styleUrl: './medication-list.component.scss'
})
export class MedicationListComponent implements OnInit {
  logoPath = 'assets/medicator.png';
  search$: Subject<string> = new Subject<string>();
  searchFilter = signal('');
  @ViewChild('modalPlaceHolder', { read: ViewContainerRef }) componentRef?: ViewContainerRef;

  medications = computed(() => {
    if (this.searchFilter().length > 0) {
      return this.medicationService.medications().filter(medication =>
        medication.medicationName.toLowerCase().includes(this.searchFilter().toLowerCase()))
    } else {
      return this.medicationService.medications();
    }

  })

  constructor(public medicationService: MedicationService, private modalService: ModalService) {
  }
  ngOnInit(): void {

    this.search$.pipe(
      distinctUntilChanged(),
      debounceTime(400),
    ).subscribe((criteria: string) => {
      this.searchFilter.set(criteria);
    });

  }

  addMedication(): void {
    if (this.componentRef) {
      const modalFormInstance: ComponentRef<MedicationComponent> = this.modalService.openModal(this.componentRef);
      modalFormInstance.instance.closeClicked.subscribe(() => {
        modalFormInstance.destroy();
      })
    }
  }

  editItem(medicationItem: MedicationModel): void {
    if (this.componentRef) {
      const modalFormInstance: ComponentRef<MedicationComponent> = this.modalService.openModal(this.componentRef, medicationItem);
      modalFormInstance.instance.closeClicked.subscribe(() => {
        modalFormInstance.destroy();
      })
    }
  }

  removeItem(index: string): void {
    this.medicationService.removeMedication(index);
  }

  search(event: Event): void {
    this.search$.next((event.target as HTMLInputElement).value);

  }
}
