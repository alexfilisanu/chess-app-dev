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
    isVisiblePassword: Boolean = false;
    isVisibleConfirmPassword: Boolean = false;
    backendError: string = '';

    constructor(private route: ActivatedRoute,
                private router: Router,
                private playerService: PlayerServiceService) {
      this.player = new Player();
    }

    togglePassword(): void {
        this.isVisiblePassword = !this.isVisiblePassword;
    }

    toggleConfirmPassword(): void {
        this.isVisibleConfirmPassword = !this.isVisibleConfirmPassword;
    }

    onSubmit(): void {
        this.playerService
            .registerNewPlayer(this.player)
            .subscribe(result => this.gotoRegisterSuccessful(),
                       error => this.backendError = error.message);
    }

    gotoRegisterSuccessful(): void {
            this.router.navigate(['/register-successful']);
        }
}
