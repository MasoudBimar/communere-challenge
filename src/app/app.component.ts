import { Component } from '@angular/core';
import { MedicationListComponent } from "./pages/medication-list/medication-list.component";

@Component({
  selector: 'app-root',
  imports: [MedicationListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'CommunereChallenge';

}
