import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bishop',
  template: `<img [src]="isWhite ? whiteBishopImagePath : blackBishopImagePath" [style.width.px]="imageSize">`,
  styles: [`
    img {
      width: 100%;
      max-width: 45px;
    }
  `]
})
export class BishopComponent {
  @Input() isWhite !: boolean;
  @Input() imageSize = 45;
  whiteBishopImagePath = 'assets/chess-pieces/white-bishop.png';
  blackBishopImagePath = 'assets/chess-pieces/black-bishop.png';
}
