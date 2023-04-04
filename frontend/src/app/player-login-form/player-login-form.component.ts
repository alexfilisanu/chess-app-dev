import { Component } from '@angular/core';
import { HostBinding, HostListener } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-player-login-form',
  templateUrl: './player-login-form.component.html',
  styleUrls: ['./player-login-form.component.css'],
  animations: [
    trigger('animateZoomIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.5)' }),
        animate('0.3s ease-out', style({ opacity: 1, transform: 'scale(1)' })),
    ]),
   ]),
  ]
})

export class PlayerLoginFormComponent {
  @HostBinding('@animateZoomIn') public animateZoomIn = true;

  @HostListener('mouseenter')
  public onMouseEnter(): void {
    this.animateZoomIn = true;
  }

  @HostListener('mouseleave')
  public onMouseLeave(): void {
    this.animateZoomIn = false;
  }

  isVisible: Boolean = false;
  togglePassword(): void {
    this.isVisible = !this.isVisible;
  }
}
