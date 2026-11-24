import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterEmailComponent } from './register-email/register-email.component';
import { RegisterOtpComponent } from './register-otp/register-otp.component';
import { RegisterInfoComponent } from './register-info/register-info.component';
import { RegisterPasswordComponent } from './register-password/register-password.component';
import { RegisterProgressComponent } from './register-progress/register-progress.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { RouterLink } from '@angular/router';
import { passwordMatchValidator } from '../model/password-match.validator';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [
    RouterLink,
    ReactiveFormsModule,
    RegisterEmailComponent,
    RegisterOtpComponent,
    RegisterInfoComponent,
    RegisterPasswordComponent,
    RegisterProgressComponent,
    ButtonComponent,
  ],
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);

  readonly currentStep = signal(0);

  readonly showProgress = computed(() => this.currentStep() > 0);

  readonly progress = computed(() => this.currentStep() * 25);

  readonly emailForm = this.fb.control('', [
    Validators.required,
    Validators.email,
  ]);

  readonly otpForm = this.fb.control('', [
    Validators.required,
    Validators.pattern(/^\d{6}$/),
  ]);

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
    const currentControl = [
      this.emailForm,
      this.otpForm,
      this.infoForm,
      this.passwordForm,
    ][this.currentStep()];

    currentControl.markAllAsTouched();

    if (currentControl.invalid) return;

    if (this.currentStep() === 3) {
      this.submit();
      return;
    }

    this.currentStep.update((step) => step + 1);
  }

  previous(): void {
    if (this.currentStep() > 0) {
      this.currentStep.update((step) => step - 1);
    }
  }

  submit(): void {
    const registrationData = {
      email: this.emailForm.value,
      otp: this.otpForm.value,
      ...this.infoForm.getRawValue(),
      ...this.passwordForm.getRawValue(),
    };

    console.log(registrationData);

    // TODO: Call registration API.
    // After successful response:
    // this.currentStep.set(4);
  }
}
