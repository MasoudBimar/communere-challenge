import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MedicationListComponent } from "./pages/medication-list/medication-list.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MedicationListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'CommunereChallenge';

}
