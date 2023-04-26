import { Component, Input, Injectable } from '@angular/core';
import { ItemTypes } from '../chess-board/constants';

@Component({
    selector: 'app-knight',
    template: `<span>♘</span>`,
    styles: [`
    span {
        font-weight: 400;
        font-size: 54px;
        line-height: 70px;
    }
    `]
})
export class KnightComponent {

}
