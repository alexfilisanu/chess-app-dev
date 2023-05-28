import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pawn',
  template: `
      <ng-container *ngIf="!isOnlineGame">
        <img [src]="isWhite ? whitePawnImagePath : blackPawnImagePath" [style.width.px]="imageSize">
      </ng-container>
      <ng-container *ngIf="isOnlineGame">
        <span [style.font-family]="fontFamily">{{ isWhite ? '♙' : '♟' }}</span>
      </ng-container>
      `,
  styles: [`
    img {
      width: 100%;
      max-width: 35px;
    }
    span {
      font-weight: 400;
      font-size: 54px;
      line-height: 70px;
    }
  `]
})
export class PawnComponent {
  @Input() isOnlineGame !: boolean;
  @Input() isWhite !: boolean;
  @Input() imageSize = 45;
  @Input() fontFamily = 'Arial';
  whitePawnImagePath = 'assets/chess-pieces/white-pawn.png';
  blackPawnImagePath = 'assets/chess-pieces/black-pawn.png';
}
