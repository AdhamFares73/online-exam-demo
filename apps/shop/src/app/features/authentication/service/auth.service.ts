import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  ConfirmOtpRequest,
  ConfirmOtpResponse,
  SendEmailVerificationRequest,
  SendEmailVerificationResponse,
} from '../model/auth.model';
import { defer, finalize, Observable, switchMap, timer } from 'rxjs';
// import { authResponse, Login, Register } from '../model/auth.model';
// import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = environment.apiUrl;

  private readonly authUrl = `${this.baseUrl}/api/auth/`;

  private readonly httpClient = inject(HttpClient);

  // Register(params: Register): Observable<authResponse> {
  //   return this.httpClient.post<authResponse>(
  //     `${this.AuthUrl}/register`,
  //     params,
  //   );
  // }

  // login(params: Login): Observable<authResponse> {
  //   return this.httpClient
  //     .post<authResponse>(`${this.AuthUrl}/login`, params)
  //     .pipe(
  //       tap({
  //         next: (response) => {
  //           this.handleLoginSuccess(response);
  //         },
  //         error: (error) => {
  //           this.handleLoginError(error.message);
  //         },
  //       }),
  //     );
  // }
  // private handleLoginSuccess(response: authResponse) {
  //   this.storeTokens(response.token);
  //   localStorage.setItem('user', JSON.stringify(response.user));
  // }
  // private handleLoginError(error: string) {
  //   console.error(error);
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('user');
  // }
  // private storeTokens(token: string): void {
  //   localStorage.setItem('token', token);
  // }
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
}
