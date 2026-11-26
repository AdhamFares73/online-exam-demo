import { Component, Input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../../../shared/components/Input/Input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-register-password',
  templateUrl: './register-password.component.html',
  styleUrls: ['./register-password.component.css'],
  imports: [ReactiveFormsModule, InputComponent, ButtonComponent],
})
export class RegisterPasswordComponent {
  @Input({ required: true }) passwordForm!: FormGroup;
  @Input({ required: true }) loading = false;
  readonly nextStep = output<void>();
  submit() {
    this.passwordForm.markAllAsTouched();
    if (this.passwordForm.invalid) return;
    this.nextStep.emit();
    console.log(this.passwordForm.value);
  }
  getErrorMessage(field: string): string {
    const control = this.passwordForm.get(field);

    if (!control || !control.errors || !control.touched) {
      return '';
    }

    if (control.hasError('required')) {
      return 'Field is required';
    }

    if (control.hasError('minlength') && field === 'password') {
      return 'Password must be at least 8 characters.';
    }

    if (control.hasError('pattern') && field === 'password') {
      return 'Password must include at least one uppercase letter and one special character.';
    }
    return '';
  }
}
