import { Component, computed, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { RegisterEmailComponent } from './register-email/register-email.component';
import { RegisterOtpComponent } from './register-otp/register-otp.component';
import { RegisterInfoComponent } from './register-info/register-info.component';
import { RegisterPasswordComponent } from './register-password/register-password.component';
import { RegisterProgressComponent } from './register-progress/register-progress.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { RouterLink } from '@angular/router';
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

  // Email is hidden from the progress bar.
  // OTP = 25%, Info = 50%, Password = 75%.
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
    { validators: this.passwordMatchValidator },
  );

  private passwordMatchValidator(
    control: AbstractControl,
  ): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (!password || !confirmPassword) return null;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

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

    // TODO: Call email API before leaving step 0.
    // TODO: Verify OTP through API before leaving step 1.

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
