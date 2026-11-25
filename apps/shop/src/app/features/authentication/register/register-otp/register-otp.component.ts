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
@Component({
  selector: 'app-register-otp',
  templateUrl: './register-otp.component.html',
  styleUrls: ['./register-otp.component.css'],
  imports: [ReactiveFormsModule, InputOtpModule, ButtonComponent],
})
export class RegisterOtpComponent implements OnInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
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
  submit() {
    this.otpForm.markAllAsTouched();
    if (this.otpForm.invalid) return;

    // Next
    this.codeSent.emit();
    console.log(this.otpForm.value);
  }
  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}
