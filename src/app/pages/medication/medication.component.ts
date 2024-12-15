import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DayEnum, MedicationModel, SelectItem, UnitEnum } from '../../model/medification.model';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MedicationService } from '../../services/medication.service';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-medication',
  imports: [ReactiveFormsModule, JsonPipe, CommonModule],
  templateUrl: './medication.component.html',
  styleUrl: './medication.component.scss'
})
export class MedicationComponent implements OnInit {
  unitItems: SelectItem[] = Object.entries(UnitEnum).map(([label, value]) => ({ label, value }));
  dayItems: SelectItem[] = Object.entries(DayEnum).map(([label, value]) => ({ label, value }));
  medicationForm: FormGroup;
  @Input() medicationModel?: MedicationModel;
  @Output() closeClicked: EventEmitter<void>= new EventEmitter<void>();

  constructor(private formBuilder: FormBuilder,private medicationService: MedicationService ) {
    this.medicationForm = this.formBuilder.group({
      id: [undefined],
      medicationName: ['', [Validators.required, Validators.minLength(3)]],
      dosage: [null, [Validators.required, Validators.min(0.1)]],
      dosageUnit: ['', Validators.required],
      day: ['', Validators.required],
      frequency: this.formBuilder.array([this.formBuilder.control(['', Validators.required ])]),
      issueDate: new Date(),
    });
  }
  ngOnInit(): void {
    if (this.medicationModel) {
      this.medicationForm.patchValue(this.medicationModel);
    }
  }

  get frequency(): FormArray {
    return this.medicationForm.get('frequency') as FormArray;
  }

  addMoreTime() {
    if (this.frequency.length < 5) {
      this.frequency.push(this.formBuilder.control(''));
    }
  }

  removeTime(timeIndex: number) {
    this.frequency.removeAt(timeIndex);
  }

  selectDay(day:SelectItem){
    if (this.medicationForm.value.day.includes(day.value)) {
      this.medicationForm.patchValue({'day': this.medicationForm.value.day.filter((item: string) => item !== day.value)});
    }else{
      this.medicationForm.patchValue({'day': [day.value, ...this.medicationForm.value.day]});
    }
  }

  closeModal(){
    this.closeClicked.emit();
  }

  submit(){
    console.log("🚀 ~ MedicationComponent ~ submit ~ e:", this.medicationForm)
    if (this.medicationForm.valid) {
      if (this.medicationForm.value.id) {
        this.medicationService.updateMedication(this.medicationForm.value);
      } else {
        this.medicationService.addMedications(this.medicationForm.value);
        this.closeClicked.emit();
      }
    }
  }
}
