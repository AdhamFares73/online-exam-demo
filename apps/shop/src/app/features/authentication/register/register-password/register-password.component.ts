import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../../../shared/components/Input/Input.component';

@Component({
  selector: 'app-register-password',
  templateUrl: './register-password.component.html',
  styleUrls: ['./register-password.component.css'],
  imports: [ReactiveFormsModule, InputComponent],
})
export class RegisterPasswordComponent {
  @Input({ required: true }) passwordForm!: FormGroup;
}
