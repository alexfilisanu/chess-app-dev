import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Player } from '../player';
import { PlayerServiceService } from '../player-service/player-service.service';

@Component({
  selector: 'app-player-register-form',
  templateUrl: './player-register-form.component.html',
  styleUrls: ['./player-register-form.component.css']
})
export class PlayerRegisterFormComponent {
  player: Player;

   constructor( private route: ActivatedRoute,
                private router: Router,
                private playerService: PlayerServiceService) {
      this.player = new Player();
    }

  isVisiblePassword: Boolean = false;
  togglePassword(): void {
    this.isVisiblePassword = !this.isVisiblePassword;
  }

  isVisibleConfirmPassword: Boolean = false;
  toggleConfirmPassword(): void {
      this.isVisibleConfirmPassword = !this.isVisibleConfirmPassword;
    }

  onSubmit() {
      this.playerService.save(this.player).subscribe(result => this.gotoLogin());
    }

  gotoLogin() {
      this.router.navigate(['/login']);
    }
}
