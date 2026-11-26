import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideChevronRight } from '@lucide/angular';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  imports: [LucideChevronRight, ProgressSpinnerModule],
})
export class ButtonComponent {
  @Input({ required: true }) value = '';
  @Input() bgColor = '#155dfc';
  @Input() textColor = '#fff';
  @Input() showArrow = false;
  @Input() showSpinner = false;
  @Input() isDisabled = false;
  @Output() buttonClicked = new EventEmitter();

  clicked(event: any) {
    this.buttonClicked.emit(event);
  }
}
