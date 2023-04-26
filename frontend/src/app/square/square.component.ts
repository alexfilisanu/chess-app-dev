import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent {
    @Input() black !: boolean;

      getStyle() {
          return this.black
              ? { backgroundColor: '#BAA378', color: 'black' }
              : { backgroundColor: 'rgb(97, 84, 61)', color: 'black' }
      }
}
