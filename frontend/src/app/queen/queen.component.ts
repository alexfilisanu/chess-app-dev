import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-queen',
  template: `
      <ng-container *ngIf="!isOnlineGame">
        <img [src]="isWhite ? whiteQueenImagePath : blackQueenImagePath" [style.width.px]="imageSize">
      </ng-container>
      <ng-container *ngIf="isOnlineGame">
        <span [style.font-family]="fontFamily">{{ isWhite ? '♕' : '♛' }}</span>
      </ng-container>
      `,
  styles: [`
    img {
      width: 100%;
      max-width: 38px;
    }
    span {
      font-weight: 400;
      font-size: 54px;
      line-height: 70px;
    }
  `]
})
export class QueenComponent {
  @Input() isOnlineGame !: boolean;
  @Input() isWhite !: boolean;
  @Input() imageSize = 45;
  @Input() fontFamily = 'Arial';
  whiteQueenImagePath = 'assets/chess-pieces/white-queen.png';
  blackQueenImagePath = 'assets/chess-pieces/black-queen.png';
}
