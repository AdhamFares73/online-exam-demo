import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LucideMoveLeft } from '@lucide/angular';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-forget-password-verify-otp',
  templateUrl: './forget-password-verify-otp.component.html',
  styleUrls: ['./forget-password-verify-otp.component.css'],
  imports: [LucideMoveLeft],
})
export class ForgetPasswordVerifyOtpComponent {
  private readonly router = inject(Router);

  private readonly platformId = inject(PLATFORM_ID);

  readonly email = signal(this.getEmail());

  private getEmail(): string {
    const navigationEmail =
      this.router.getCurrentNavigation()?.extras.state?.['email'];

    if (navigationEmail) return navigationEmail;

    if (isPlatformBrowser(this.platformId)) {
      return window.history.state?.email ?? '';
    }

    return '';
  }
  goBack(): void {
    this.router.navigate(['/auth/forget-password']);
  }
}
