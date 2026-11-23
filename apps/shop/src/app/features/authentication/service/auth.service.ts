import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { authResponse, Login, Register } from '../model/auth.model';
import { Observable, tap } from 'rxjs';

@Injectable()
export class AuthService {
  private readonly BaseUrl = environment.apiUrl;

  private readonly AuthUrl = `${this.BaseUrl}/api/auth/`;

  private readonly httpClient = inject(HttpClient);

  Register(params: Register): Observable<authResponse> {
    return this.httpClient.post<authResponse>(
      `${this.AuthUrl}/register`,
      params,
    );
  }

  login(params: Login): Observable<authResponse> {
    return this.httpClient
      .post<authResponse>(`${this.AuthUrl}/login`, params)
      .pipe(
        tap({
          next: (response) => {
            this.handleLoginSuccess(response);
          },
          error: (error) => {
            this.handleLoginError(error.message);
          },
        }),
      );
  }
  private handleLoginSuccess(response: authResponse) {
    this.storeTokens(response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
  }
  private handleLoginError(error: string) {
    console.error(error);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
  private storeTokens(token: string): void {
    localStorage.setItem('token', token);
  }
}
