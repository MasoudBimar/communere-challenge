/* eslint-disable @typescript-eslint/no-inferrable-types */
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { Component, ComponentRef, OnInit, signal, ViewChild, ViewContainerRef, WritableSignal } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { MedicationModel } from '../../model/medification.model';
import { FrequencyPipe } from '../../pipe/frequency.pipe';
import { MedicationService } from '../../services/medication.service';
import { ModalService } from '../../services/modal.service';
import { MedicationComponent } from '../medication/medication.component';

@Component({
  selector: 'app-medication-list',
  imports: [ FrequencyPipe, DatePipe, NgOptimizedImage],
  templateUrl: './medication-list.component.html',
  styleUrl: './medication-list.component.scss'
})
export class MedicationListComponent implements OnInit {
  loading = true;
  logoPath = 'assets/medicator.png';
  medications: WritableSignal<MedicationModel[]> = signal([]);
  searchCriteria: string='';
  search$: Subject<string>= new Subject<string>();
  @ViewChild('modalPlaceHolder', { read: ViewContainerRef }) componentRef?: ViewContainerRef;
  /**
   *
   */
  constructor(public medicationService: MedicationService, private modalService: ModalService) {
    this.reloadData();
  }
  ngOnInit(): void {
    this.search$.pipe(
      distinctUntilChanged(),
      debounceTime(400),
    ).subscribe((criteria)=> {
      this.reloadData(criteria);
      });
  }
  addMedication(): void {
    if (this.componentRef) {
      const modalFormInstance: ComponentRef<MedicationComponent> =  this.modalService.openModal(this.componentRef);
      modalFormInstance.instance.closeClicked.subscribe(() => {
        modalFormInstance.destroy();
        this.reloadData();
      })
    }
  }

  editItem(medicationItem: MedicationModel): void{
    if (this.componentRef) {
      const modalFormInstance: ComponentRef<MedicationComponent> =  this.modalService.openModal(this.componentRef, medicationItem);
      modalFormInstance.instance.closeClicked.subscribe(() => {
        modalFormInstance.destroy();
        this.reloadData();
      })
    }
  }

  removeItem(index: string): void{
    this.medicationService.removeMedication(index);
    this.reloadData();
  }

  search(event: Event): void{
    this.search$.next((event.target as HTMLTextAreaElement).value);
  }

  reloadData(search: string=''): void{
    this.medications.set( this.medicationService.getMedications(search));
    this.loading = false;
  }
}
