import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideChevronRight } from '@lucide/angular';
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  imports: [LucideChevronRight],
})
export class ButtonComponent {
  @Input({ required: true }) value = '';
  @Input() bgColor = '#155dfc';
  @Input() textColor = '#fff';
  @Input() showArrow = false;
  @Output() buttonClicked = new EventEmitter();

  clicked(event: any) {
    this.buttonClicked.emit(event);
  }
}
