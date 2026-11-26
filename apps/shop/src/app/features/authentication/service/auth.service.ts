import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  ConfirmOtpRequest,
  ConfirmOtpResponse,
  RegisterRequest,
  RegisterResponse,
  SendEmailVerificationRequest,
  SendEmailVerificationResponse,
} from '../model/auth.model';
import { defer, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = environment.apiUrl;

  private readonly authUrl = `${this.baseUrl}/api/auth/`;

  private readonly httpClient = inject(HttpClient);

  emailVerification(
    params: SendEmailVerificationRequest,
  ): Observable<SendEmailVerificationResponse> {
    return defer(() =>
      this.httpClient.post<SendEmailVerificationResponse>(
        `${this.authUrl}send-email-verification`,
        params,
      ),
    );
  }
  ConfirmOtpVerification(
    params: ConfirmOtpRequest,
  ): Observable<ConfirmOtpResponse> {
    return defer(() =>
      this.httpClient.post<ConfirmOtpResponse>(
        `${this.authUrl}confirm-email-verification`,
        params,
      ),
    );
  }
  ConfirmRegisteration(params: RegisterRequest): Observable<RegisterResponse> {
    return defer(() =>
      this.httpClient.post<RegisterResponse>(`${this.authUrl}register`, params),
    );
  }
}
