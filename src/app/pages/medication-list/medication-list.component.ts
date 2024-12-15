/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, ComponentRef, OnInit, signal, ViewChild, ViewContainerRef, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { MedicationModel } from '../../model/medification.model';
import { FrequencyPipe } from '../../pipe/frequency.pipe';
import { MedicationService } from '../../services/medication.service';
import { ModalService } from '../../services/modal.service';
import { MedicationComponent } from '../medication/medication.component';

@Component({
  selector: 'app-medication-list',
  imports: [AsyncPipe, FrequencyPipe, DatePipe, FormsModule],
  templateUrl: './medication-list.component.html',
  styleUrl: './medication-list.component.scss'
})
export class MedicationListComponent implements OnInit {
  loading = false;
  medications$: WritableSignal<MedicationModel[]> = signal([]);
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
  addMedication() {
    if (this.componentRef) {
      const modalFormInstance: ComponentRef<MedicationComponent> =  this.modalService.openModal(this.componentRef);
      modalFormInstance.instance.closeClicked.subscribe(() => {
        modalFormInstance.destroy();
        this.reloadData();
      })
    }
  }

  editItem(medicationItem: MedicationModel){
    console.log("🚀 ~ MedicationListComponent ~ editItem ~ medicationItem:", medicationItem)
    if (this.componentRef) {
      const modalFormInstance: ComponentRef<MedicationComponent> =  this.modalService.openModal(this.componentRef, medicationItem);
      modalFormInstance.instance.closeClicked.subscribe(() => {
        modalFormInstance.destroy();
        this.reloadData();
      })
    }
  }

  removeItem(index: string){
    this.medicationService.removeMedication(index);
    this.reloadData();
  }

  search(event: Event){
    console.log("🚀 ~ MedicationListComponent ~ search ~ e:", event )
    this.search$.next((event.target as HTMLTextAreaElement).value);
  }

  reloadData(search: string=''){
    this.medicationService.getMedications(search).subscribe(result=> {
      this.medications$.set(result);
    })
  }
}
