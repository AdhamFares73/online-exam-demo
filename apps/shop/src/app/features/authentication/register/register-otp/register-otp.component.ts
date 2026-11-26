import {
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputOtpModule } from 'primeng/inputotp';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { catchError, exhaustMap, map, of, startWith, Subject, tap } from 'rxjs';
import { ConfirmOtpRequest, OtpState } from '../../model/auth.model';
import { AuthService } from '../../service/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-register-otp',
  templateUrl: './register-otp.component.html',
  styleUrls: ['./register-otp.component.css'],
  imports: [
    ReactiveFormsModule,
    InputOtpModule,
    ButtonComponent,
    ToastModule,
    RippleModule,
  ],
  providers: [MessageService],
})
export class RegisterOtpComponent implements OnInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly messageService = inject(MessageService);

  readonly counter = signal(60);
  private timer?: ReturnType<typeof setInterval>;
  readonly otpForm = this.fb.group({
    code: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
  });
  @Input({ required: true }) email = '';
  readonly back = output<void>();
  readonly codeSent = output<void>();
  ngOnInit(): void {
    this.startCouner();
  }
  editEmail() {
    this.back.emit();
  }
  private startCouner() {
    this.counter.set(60);
    this.timer = setInterval(() => {
      this.counter.update((value) => {
        if (value <= 1) {
          clearInterval(this.timer);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
  }
  private readonly submit$ = new Subject<ConfirmOtpRequest>();

  private readonly otpState$ = this.submit$.pipe(
    exhaustMap(({ email, code }) =>
      this.authService.ConfirmOtpVerification({ email, code }).pipe(
        map((response): OtpState => ({
          status: 'success',
          data: response,
        })),
        tap((state) => {
          if (state.status === 'success') {
            this.codeSent.emit();
          }
        }),
        catchError((error: HttpErrorResponse) => {
          console.log(error);

          const errorMessage =
            error.error?.message ?? 'Something went wrong. Please try again.';

          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: errorMessage,
          });

          return of<OtpState>({
            status: 'error',
            message: errorMessage,
          });
        }),
        startWith<OtpState>({
          status: 'loading',
        }),
      ),
    ),
    startWith<OtpState>({
      status: 'idle',
    }),
  );

  readonly state = toSignal(this.otpState$, {
    initialValue: {
      status: 'idle',
    } as OtpState,
  });

  sendOtp(): void {
    this.otpForm.markAsTouched();

    if (this.otpForm.invalid || this.state().status === 'loading') {
      return;
    }

    const code = this.otpForm.get('code')?.value?.trim();

    if (!code) return;

    this.submit$.next({
      email: this.email,
      code,
    });
  }

  getErrorMessage(field: string): string {
    const control = this.otpForm.get(field);
    if (!control || !control.errors || !control.touched) {
      return '';
    }
    if (control.hasError('required')) {
      return 'Email is required';
    }
    if (control.hasError('email')) {
      return 'Please enter a valid email address';
    }
    return '';
  }
  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}
