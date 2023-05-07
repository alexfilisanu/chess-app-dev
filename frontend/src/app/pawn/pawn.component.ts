import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-pawn',
    template: `<span [style.font-family]="fontFamily">{{ isWhite ? '♙' : '♟' }}</span>`,
    styles: [`
        span {
            font-weight: 400;
            font-size: 54px;
            line-height: 70px;
        }
    `]
})
export class PawnComponent {
    @Input() isWhite !: boolean;
    @Input() fontFamily = 'Arial';
}
