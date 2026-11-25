import { Component, Input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../../../shared/components/Input/Input.component';
import { EgyFlagComponent } from '../../../../shared/icons/egy-flag/egy-flag.component';
import { LucideChevronsUpDown } from '@lucide/angular';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-register-info',
  templateUrl: './register-info.component.html',
  styleUrls: ['./register-info.component.css'],
  imports: [
    ReactiveFormsModule,
    InputComponent,
    EgyFlagComponent,
    LucideChevronsUpDown,
    ButtonComponent,
  ],
})
export class RegisterInfoComponent {
  @Input({ required: true }) infoForm!: FormGroup;
  readonly nextStep = output<void>();

  submit() {
    this.infoForm.markAllAsTouched();
    if (this.infoForm.invalid) return;
    this.nextStep.emit();
    console.log(this.infoForm.value);
  }
}
