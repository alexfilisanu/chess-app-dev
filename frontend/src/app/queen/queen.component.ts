import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-queen',
  template: `<img [src]="isWhite ? whiteQueenImagePath : blackQueenImagePath" [style.width.px]="imageSize">`,
  styles: [`
    img {
      width: 100%;
      max-width: 38px;
    }
  `]
})
export class QueenComponent {
  @Input() isWhite !: boolean;
  @Input() imageSize = 45;
  whiteQueenImagePath = 'assets/chess-pieces/white-queen.png';
  blackQueenImagePath = 'assets/chess-pieces/black-queen.png';
}
