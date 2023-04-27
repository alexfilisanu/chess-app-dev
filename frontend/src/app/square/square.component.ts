import { Component, Input } from '@angular/core';

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
              ? { backgroundColor: '#BAA378', color: 'black' }
              : { backgroundColor: 'rgb(97, 84, 61)', color: 'black' }
      }

     getValid() {
       return this.isValid
         ? {
             backgroundColor: 'rgb(104, 150, 87)',
             border: 'solid rgb(97, 84, 61) 0.5px',
             color: 'black'
           }
         : this.getStyle();
     }
}
