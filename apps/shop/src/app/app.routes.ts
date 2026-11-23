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
      // {
      //   path: 'register',
      //   loadComponent: () =>
      //     import('./features/auth/register-page/register-page.component').then(
      //       (m) => m.RegisterPageComponent,
      //     ),
      // },
      // {
      //   path: 'forget-password',
      //   loadComponent: () =>
      //     import('./features/auth/forget-password/forget-password.component').then(
      //       (m) => m.ForgetPasswordComponent,
      //     ),
      // },
      // {
      //   path: 'verify-reset-code',
      //   canActivate: [forgetpasswordGuard],
      //   loadComponent: () =>
      //     import('./features/auth/verify-reset-code/verify-reset-code.component').then(
      //       (m) => m.VerifyResetCodeComponent,
      //     ),
      // },
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
