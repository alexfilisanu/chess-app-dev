import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rook',
  template: `<img [src]="isWhite ? whiteRookImagePath : blackRookImagePath" [style.width.px]="imageSize">`,
  styles: [`
    img {
      width: 100%;
      max-width: 45px;
    }
  `]
})
export class RookComponent {
  @Input() isWhite !: boolean;
  @Input() imageSize = 45;
  whiteRookImagePath = 'assets/chess-pieces/white-rook.png';
  blackRookImagePath = 'assets/chess-pieces/black-rook.png';
}
