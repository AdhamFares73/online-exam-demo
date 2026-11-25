import { Component, inject } from '@angular/core';
import { InputComponent } from '../../../shared/components/Input/Input.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
  imports: [InputComponent, ButtonComponent, RouterLink, ReactiveFormsModule],
})
export class ForgetPasswordComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  emailForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });

  get emailControl() {
    return this.emailForm.controls.email;
  }

  submit(): void {
    if (this.emailForm.invalid) {
      this.emailForm.markAllAsTouched();
      return;
    }

    this.router.navigate(['/auth/verify-reset-code'], {
      state: {
        email: this.emailControl.value,
      },
    });
  }
}
