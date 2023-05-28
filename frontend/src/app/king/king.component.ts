import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-king',
  template: `
    <ng-container *ngIf="!isOnlineGame">
      <img [src]="isWhite ? whiteKingImagePath : blackKingImagePath" [style.width.px]="imageSize">
    </ng-container>
    <ng-container *ngIf="isOnlineGame">
      <span [style.font-family]="fontFamily">{{ isWhite ? '♔' : '♚' }}</span>
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
export class KingComponent {
  @Input() isOnlineGame !: boolean;
  @Input() isWhite !: boolean;
  @Input() imageSize = 45;
  @Input() fontFamily = 'Arial';
  whiteKingImagePath = 'assets/chess-pieces/white-king.png';
  blackKingImagePath = 'assets/chess-pieces/black-king.png';
}
