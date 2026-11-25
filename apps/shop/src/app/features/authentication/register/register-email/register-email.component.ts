import { Component, Input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../../../shared/components/Input/Input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-register-email',
  templateUrl: './register-email.component.html',
  styleUrls: ['./register-email.component.css'],
  imports: [ReactiveFormsModule, InputComponent, ButtonComponent],
})
export class RegisterEmailComponent {
  @Input({ required: true }) emailGroup!: FormGroup;
  readonly emailSent = output<void>();
  submit() {
    this.emailGroup.markAllAsTouched();
    if (this.emailGroup.invalid) return;

    // Next
    this.emailSent.emit();
    console.log(this.emailGroup.value);
  }
}
