import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bishop',
  template: `
      <ng-container *ngIf="!isOnlineGame">
        <img [src]="isWhite ? whiteBishopImagePath : blackBishopImagePath" [style.width.px]="imageSize">
      </ng-container>
      <ng-container *ngIf="isOnlineGame">
        <span [style.font-family]="fontFamily">{{ isWhite ? '♗' : '♝' }}</span>
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
export class BishopComponent {
  @Input() isOnlineGame !: boolean;
  @Input() isWhite !: boolean;
  @Input() imageSize = 45;
  @Input() fontFamily = 'Arial';
  whiteBishopImagePath = 'assets/chess-pieces/white-bishop.png';
  blackBishopImagePath = 'assets/chess-pieces/black-bishop.png';
}
