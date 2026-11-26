import { Component, inject, Input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../../../shared/components/Input/Input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { AuthService } from '../../service/auth.service';
import { catchError, exhaustMap, map, of, startWith, Subject, tap } from 'rxjs';
import { AuthState } from '../../model/auth.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-register-email',
  templateUrl: './register-email.component.html',
  styleUrls: ['./register-email.component.css'],
  imports: [ReactiveFormsModule, InputComponent, ButtonComponent, RouterLink],
})
export class RegisterEmailComponent {
  private readonly authService = inject(AuthService);

  @Input({ required: true }) emailGroup!: FormGroup;

  readonly emailSent = output<void>();

  private readonly submit$ = new Subject<string>();

  private readonly emailState$ = this.submit$.pipe(
    exhaustMap((email) =>
      this.authService.emailVerification({ email }).pipe(
        map((response): AuthState => ({
          status: 'success',
          data: response,
        })),
        tap((state) => {
          if (state.status === 'success') {
            this.emailSent.emit();
          }
        }),
        catchError(() =>
          of<AuthState>({
            status: 'error',
            message: 'Something went wrong. Please try again.',
          }),
        ),
        startWith<AuthState>({
          status: 'loading',
        }),
      ),
    ),

    startWith<AuthState>({
      status: 'idle',
    }),
  );

  readonly state = toSignal(this.emailState$, {
    initialValue: {
      status: 'idle',
    } as AuthState,
  });

  sendEmail(): void {
    this.emailGroup.markAsTouched();

    if (this.emailGroup.invalid || this.state().status === 'loading') {
      return;
    }

    const email = this.emailGroup.get('email')?.value?.trim();

    if (!email) return;

    this.submit$.next(email);
  }

  getErrorMessage(field: string): string {
    const control = this.emailGroup.get(field);
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
}
