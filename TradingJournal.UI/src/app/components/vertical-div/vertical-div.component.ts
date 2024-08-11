import { Component, Input } from '@angular/core';
import { NgStyle } from "@angular/common";

@Component({
  selector: 'app-vertical-div',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './vertical-div.component.html',
  styleUrl: './vertical-div.component.scss'
})
export class VerticalDivComponent {
  @Input() color = 'white';
}
