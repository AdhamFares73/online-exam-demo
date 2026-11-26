import { Component, Input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../../../shared/components/Input/Input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { EgyFlagComponent } from '../../../../shared/icons/egy-flag/egy-flag.component';
import { LucideChevronsUpDown } from '@lucide/angular';

@Component({
  selector: 'app-register-info',
  templateUrl: './register-info.component.html',
  styleUrls: ['./register-info.component.css'],
  imports: [
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    EgyFlagComponent,
    LucideChevronsUpDown,
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
  getErrorMessage(field: string): string {
    const control = this.infoForm.get(field);
    if (!control || !control.errors || !control.touched) {
      return '';
    }
    if (control.hasError('required')) {
      return 'Field is required';
    }
    if (control.hasError('minlength')) {
      return 'Field must be at least 2 characters';
    }
    if (control.hasError('pattern') && field === 'phone') {
      return 'Please enter a valid Egyptian mobile number (e.g. 1XXXXXXXXX).';
    }
    return '';
  }
}
