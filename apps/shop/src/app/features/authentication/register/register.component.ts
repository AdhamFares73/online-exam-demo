import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterEmailComponent } from './register-email/register-email.component';
import { RegisterOtpComponent } from './register-otp/register-otp.component';
import { RegisterInfoComponent } from './register-info/register-info.component';
import { RegisterPasswordComponent } from './register-password/register-password.component';
import { RegisterProgressComponent } from './register-progress/register-progress.component';
import { passwordMatchValidator } from '../model/password-match.validator';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [
    ReactiveFormsModule,
    RegisterEmailComponent,
    RegisterOtpComponent,
    RegisterInfoComponent,
    RegisterPasswordComponent,
    RegisterProgressComponent,
  ],
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);

  readonly currentStep = signal(2);

  readonly showProgress = computed(() => this.currentStep() > 0);

  readonly emailForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  readonly infoForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: ['', Validators.required],
    phone: ['', Validators.required],
  });

  readonly passwordForm = this.fb.group(
    {
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    },
    { validators: passwordMatchValidator('password', 'confirmPassword') },
  );

  next(): void {
    this.currentStep.update((step) => step + 1);
    if (this.currentStep() > 3) {
      this.submit();
      return;
    }
  }

  previous(): void {
    if (this.currentStep() > 0) {
      this.currentStep.update((step) => step - 1);
    }
  }

  submit(): void {
    const registrationData = {
      ...this.emailForm.getRawValue(),
      ...this.infoForm.getRawValue(),
      ...this.passwordForm.getRawValue(),
    };

    console.log(registrationData);
  }
}
