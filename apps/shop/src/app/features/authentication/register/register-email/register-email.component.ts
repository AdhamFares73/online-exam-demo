import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../../../shared/components/Input/Input.component';

@Component({
  selector: 'app-register-email',
  templateUrl: './register-email.component.html',
  styleUrls: ['./register-email.component.css'],
  imports: [ReactiveFormsModule, InputComponent],
})
export class RegisterEmailComponent {
  @Input({ required: true }) emailControl!: FormControl<string | null>;
}
