import { Component } from '@angular/core';

@Component({
  selector: 'app-bishop',
  template: `<span>♗</span>`,
    styles: [`
    span {
          font-weight: 400;
          font-size: 54px;
          line-height: 70px;
    }
    `]
})
export class BishopComponent {

}
