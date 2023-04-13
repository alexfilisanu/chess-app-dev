import { Component, AfterViewInit, HostBinding, HostListener } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { Player } from '../player';
import { PlayerServiceService } from '../player-service/player-service.service';


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
  ],
})
export class PlayerLoginFormComponent {
  player: Player;
  backendError: string = '';

  constructor(
    private router: Router,
    private playerService: PlayerServiceService
  ) {
    this.player = new Player();
  }

  @HostBinding('@animateZoomIn')
  public animateZoomIn = true;

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

  gotoClientHomepage(): void {
    this.router.navigate(['/client-homepage']);
  }

  login(): void {
    const username = this.player['username'] ?? '';
    const password = this.player['password'] ?? '';

    this.playerService.checkLoginCredentials(username, password).subscribe(
      (result) => {
        this.gotoClientHomepage();
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
      },
      (error) => (this.backendError = error.message)
    );
  }

  signInWithGoogle(): void {
  }
}
