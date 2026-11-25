import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { LucideEye, LucideEyeOff } from '@lucide/angular';

@Component({
  selector: 'app-input',
  templateUrl: './Input.component.html',
  styleUrls: ['./Input.component.css'],
  imports: [LucideEye, LucideEyeOff],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent {
  @Input() labelName = '';
  @Input() mandatory = false;
  @Input({ required: true }) type: 'text' | 'password' | 'email' | 'number' =
    'text';
  @Input({ required: true }) placeholder = '';
  @Input({ required: true }) forId = '';
  @Input() inputValue = '';
  @Input() errorMessage = '';
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string | null): void {
    this.inputValue = value ?? '';
  }
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.inputValue = input.value;
    this.onChange(this.inputValue);
  }

  onBlur(): void {
    this.onTouched();
  }
  isPasswordVisible = false;

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
