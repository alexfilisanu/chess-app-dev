import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pawn',
  template: `<img [src]="isWhite ? whitePawnImagePath : blackPawnImagePath" [style.width.px]="imageSize">`,
  styles: [`
    img {
      width: 100%;
      max-width: 35px;
    }
  `]
})
export class PawnComponent {
  @Input() isWhite !: boolean;
  @Input() imageSize = 45;
  whitePawnImagePath = 'assets/chess-pieces/white-pawn.png';
  blackPawnImagePath = 'assets/chess-pieces/black-pawn.png';
}
