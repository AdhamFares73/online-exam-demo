import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterEmailComponent } from './register-email/register-email.component';
import { RegisterOtpComponent } from './register-otp/register-otp.component';
import { RegisterInfoComponent } from './register-info/register-info.component';
import { RegisterPasswordComponent } from './register-password/register-password.component';
import { RegisterProgressComponent } from './register-progress/register-progress.component';
import { passwordMatchValidator } from '../model/password-match.validator';
import { catchError, exhaustMap, map, of, startWith, Subject, tap } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { RegisterRequest, RegisterState } from '../model/auth.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
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
    RippleModule,
    ToastModule,
  ],
  providers: [MessageService],
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);

  private readonly authService = inject(AuthService);
  private readonly messageService = inject(MessageService);

  private readonly router = inject(Router);

  private readonly submit$ = new Subject<RegisterRequest>();

  readonly currentStep = signal(0);

  readonly showProgress = computed(() => this.currentStep() > 0);

  readonly emailForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });

  readonly infoForm = this.fb.nonNullable.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    username: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.pattern(/^01[0125][0-9]{8}$/)]],
  });

  readonly passwordForm = this.fb.nonNullable.group(
    {
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/(?=.*[A-Z])/),
          Validators.pattern(/(?=.*[!@#$%^&*(),.?":{}|<>])/),
        ],
      ],
      confirmPassword: ['', Validators.required],
    },
    { validators: passwordMatchValidator('password', 'confirmPassword') },
  );
  private readonly registerState$ = this.submit$.pipe(
    exhaustMap((register) =>
      this.authService.ConfirmRegisteration(register).pipe(
        map((response): RegisterState => ({
          status: 'success',
          data: response,
        })),
        tap((state) => {
          if (state.status === 'success') {
            this.currentStep.set(0);
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: ' Account Created Successfully!',
            });
            this.router.navigate(['/auth/login']);
          }
        }),
        catchError((error: HttpErrorResponse) => {
          const errorMessage =
            error.error?.message ?? 'Something went wrong. Please try again.';

          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: errorMessage,
          });
          if (errorMessage === 'This username is already taken.') {
            this.currentStep.set(0);
          }
          return of<RegisterState>({
            status: 'error',
            message: errorMessage,
          });
        }),
        startWith<RegisterState>({
          status: 'loading',
        }),
      ),
    ),

    startWith<RegisterState>({
      status: 'idle',
    }),
  );
  next(): void {
    if (this.currentStep() > 2) {
      this.submit();
    } else {
      this.currentStep.update((step) => step + 1);
    }
  }

  previous(): void {
    if (this.currentStep() > 0) {
      this.currentStep.update((step) => step - 1);
    }
  }

  submit(): void {
    const registrationData: RegisterRequest = {
      ...this.emailForm.getRawValue(),
      ...this.infoForm.getRawValue(),
      ...this.passwordForm.getRawValue(),
    };

    this.emailForm.markAsTouched();
    this.infoForm.markAsTouched();
    this.passwordForm.markAsTouched();

    if (
      this.emailForm.invalid ||
      this.infoForm.invalid ||
      this.passwordForm.invalid ||
      this.state().status === 'loading'
    ) {
      return;
    }

    if (!registrationData) return;

    this.submit$.next(registrationData);
  }

  readonly state = toSignal(this.registerState$, {
    initialValue: {
      status: 'idle',
    } as RegisterState,
  });
}
