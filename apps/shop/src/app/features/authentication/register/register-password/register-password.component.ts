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
  readonly nextStep = output<void>();
  submit() {
    this.passwordForm.markAllAsTouched();
    if (this.passwordForm.invalid) return;
    this.nextStep.emit();
    console.log(this.passwordForm.value);
  }
}
