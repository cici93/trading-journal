import { Component, Input } from '@angular/core';
import { Position } from "../../interfaces/position.interface";

@Component({
  selector: 'app-position-card',
  standalone: true,
  imports: [],
  templateUrl: './position-card.component.html',
  styleUrl: './position-card.component.scss',
  host: {
    tabindex: '0',  // make it focusable
  }
})
export class PositionCardComponent {
  @Input() position?: Position;



}
