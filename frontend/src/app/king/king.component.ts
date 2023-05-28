import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-king',
  template: `<img [src]="isWhite ? whiteKingImagePath : blackKingImagePath" [style.width.px]="imageSize">`,
  styles: [`
    img {
      width: 100%;
      max-width: 38px;
    }
  `]
})
export class KingComponent {
  @Input() isWhite !: boolean;
  @Input() imageSize = 45;
  whiteKingImagePath = 'assets/chess-pieces/white-king.png';
  blackKingImagePath = 'assets/chess-pieces/black-king.png';
}
