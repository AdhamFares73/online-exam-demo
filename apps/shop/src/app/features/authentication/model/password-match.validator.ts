import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(
  control1: string,
  control2: string,
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get(control1)?.value;
    const confirmPassword = control.get(control2)?.value;

    if (!password || !confirmPassword) {
      return null;
    }

    return password === confirmPassword ? null : { passwordMismatch: true };
  };
}
