import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-queen',
 template: `<span>{{ isWhite ? '♕' : '♛' }}</span>`,
   styles: [`
      span {
          font-weight: 400;
          font-size: 54px;
          line-height: 70px;
      }
      `]
})
export class QueenComponent {
     @Input() isWhite !: boolean;
}
