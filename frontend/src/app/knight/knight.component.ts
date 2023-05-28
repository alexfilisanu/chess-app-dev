import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-knight',
  template: `
      <ng-container *ngIf="!isOnlineGame">
        <img [src]="isWhite ? whiteKnightImagePath : blackKnightImagePath" [style.width.px]="imageSize">
      </ng-container>
      <ng-container *ngIf="isOnlineGame">
        <span [style.font-family]="fontFamily">{{ isWhite ? '♘' : '♞' }}</span>
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
export class KnightComponent {
  @Input() isOnlineGame !: boolean;
  @Input() isWhite !: boolean;
  @Input() imageSize = 45;
  @Input() fontFamily = 'Arial';
  whiteKnightImagePath = 'assets/chess-pieces/white-knight.png';
  blackKnightImagePath = 'assets/chess-pieces/black-knight.png';
}
