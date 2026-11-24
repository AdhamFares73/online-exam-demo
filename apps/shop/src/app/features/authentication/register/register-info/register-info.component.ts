import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../../../shared/components/Input/Input.component';
import { EgyFlagComponent } from '../../../../shared/icons/egy-flag/egy-flag.component';
import { LucideChevronsUpDown } from '@lucide/angular';

@Component({
  selector: 'app-register-info',
  templateUrl: './register-info.component.html',
  styleUrls: ['./register-info.component.css'],
  imports: [
    ReactiveFormsModule,
    InputComponent,
    EgyFlagComponent,
    LucideChevronsUpDown,
  ],
})
export class RegisterInfoComponent {
  @Input({ required: true }) infoForm!: FormGroup;
}
