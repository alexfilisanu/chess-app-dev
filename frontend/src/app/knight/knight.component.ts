import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-knight',
  template: `<img [src]="isWhite ? whiteKnightImagePath : blackKnightImagePath" [style.width.px]="imageSize">`,
  styles: [`
    img {
      width: 100%;
      max-width: 38px;
    }
  `]
})
export class KnightComponent {
  @Input() isWhite !: boolean;
  @Input() imageSize = 45;
  whiteKnightImagePath = 'assets/chess-pieces/white-knight.png';
  blackKnightImagePath = 'assets/chess-pieces/black-knight.png';
}
