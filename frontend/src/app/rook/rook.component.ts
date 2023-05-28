import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rook',
  template: `
      <ng-container *ngIf="!isOnlineGame">
        <img [src]="isWhite ? whiteRookImagePath : blackRookImagePath" [style.width.px]="imageSize">
      </ng-container>
      <ng-container *ngIf="isOnlineGame">
        <span [style.font-family]="fontFamily">{{ isWhite ? '♖' : '♜' }}</span>
      </ng-container>
      `,
  styles: [`
    img {
      width: 100%;
      max-width: 45px;
    }
    span {
      font-weight: 400;
      font-size: 54px;
      line-height: 70px;
    }
  `]
})
export class RookComponent {
  @Input() isOnlineGame !: boolean;
  @Input() isWhite !: boolean;
  @Input() imageSize = 45;
  @Input() fontFamily = 'Arial';
  whiteRookImagePath = 'assets/chess-pieces/white-rook.png';
  blackRookImagePath = 'assets/chess-pieces/black-rook.png';
}
