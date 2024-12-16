/* eslint-disable @typescript-eslint/no-inferrable-types */
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() confirmTitle: string = "confirm";
  @Input() formId: string="formId";
  @Output() confirmClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() closeClicked: EventEmitter<void>= new EventEmitter<void>();

  close(): void{
    this.closeClicked.emit();
  }

  confirm(): void{
    this.confirmClicked?.emit();
  }
}
