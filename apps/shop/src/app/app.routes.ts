import { Route } from '@angular/router';
// import { guestGuard } from './core/guard/guest-guard';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    // canActivate: [guestGuard],
    loadComponent: () =>
      import('./core/layout/auth-layout/auth-layout.component').then(
        (m) => m.AuthLayoutComponent,
      ),
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./features/authentication/login/login.component').then(
            (m) => m.LoginComponent,
          ),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./features/authentication/register/register.component').then(
            (m) => m.RegisterComponent,
          ),
      },
      {
        path: 'forget-password',
        loadComponent: () =>
          import('./features/authentication/forget-password/forget-password.component').then(
            (m) => m.ForgetPasswordComponent,
          ),
      },
      {
        path: 'verify-reset-code',
        // canActivate: [forgetpasswordGuard],
        loadComponent: () =>
          import('./features/authentication/forget-password-verify-otp/forget-password-verify-otp.component').then(
            (m) => m.ForgetPasswordVerifyOtpComponent,
          ),
      },
      // {
      //   path: 'reset-password',
      //   canActivate: [verifyCodeGuard],
      //   loadComponent: () =>
      //     import('./features/auth/reset-password/reset-password.component').then(
      //       (m) => m.ResetPasswordComponent,
      //     ),
      // },
    ],
  },
];
