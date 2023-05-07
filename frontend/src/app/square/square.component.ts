import { Component, Input } from '@angular/core';

enum BackgroundColor {
    LightTile = '#61543D',
    DarkTile = '#BAA378',
    ValidTile = '#689657',
    BorderTile = 'solid #61543D 0.5px'
}

@Component({
    selector: 'app-square',
    templateUrl: './square.component.html',
    styleUrls: ['./square.component.css']
})
export class SquareComponent {
    @Input() black !: boolean;
    @Input() isValid !: boolean;

    getStyle() {
        return this.black
            ? { backgroundColor: BackgroundColor.DarkTile }
            : { backgroundColor: BackgroundColor.LightTile }
    }

    getValid() {
        return this.isValid
            ? {
                backgroundColor: BackgroundColor.ValidTile,
                border: BackgroundColor.BorderTile
              }
            : this.getStyle();
    }
}
