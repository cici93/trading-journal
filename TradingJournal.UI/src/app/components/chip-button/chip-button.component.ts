import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-chip-button',
  standalone: true,
  imports: [],
  templateUrl: './chip-button.component.html',
  styleUrl: './chip-button.component.scss'
})
export class ChipButtonComponent {
  @Input() label = ""
  @Output() onClick = new EventEmitter<boolean>;


  isChecked = false;

  toggle() {
    this.isChecked = !this.isChecked;
    this.onClick.emit(this.isChecked);
  }

}
