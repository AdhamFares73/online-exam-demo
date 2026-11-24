import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-register-progress',
  templateUrl: './register-progress.component.html',
  styleUrls: ['./register-progress.component.css'],
})
export class RegisterProgressComponent {
  @Input({ required: true }) currentStep = 1;

  readonly steps = [1, 2, 3, 4];
}
