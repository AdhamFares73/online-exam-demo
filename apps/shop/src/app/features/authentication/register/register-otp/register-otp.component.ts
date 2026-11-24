import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InputOtpModule } from 'primeng/inputotp';
@Component({
  selector: 'app-register-otp',
  templateUrl: './register-otp.component.html',
  styleUrls: ['./register-otp.component.css'],
  imports: [ReactiveFormsModule, InputOtpModule],
})
export class RegisterOtpComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
  readonly counter = signal(60);
  private timer?: ReturnType<typeof setInterval>;
  ngOnInit(): void {
    this.startCouner();
  }
  @Input({ required: true }) otpControl!: FormControl<string | null>;
  @Input({ required: true }) email = '';
  @Output() back = new EventEmitter();

  editEmail(event: any) {
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
}
