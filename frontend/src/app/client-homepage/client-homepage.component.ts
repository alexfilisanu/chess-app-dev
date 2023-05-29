import { Component, OnInit } from '@angular/core';
import { PlayerServiceService } from '../player-service/player-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Player } from '../player';
import { Game } from '../game';
import { GameService } from '../game-service/game.service';

enum ResultMessage {
    WinPlayer1 = 'Win player1',
    WinPlayer2 = 'Win player2',
    Draw = 'Draw',
    StillPlaying = 'Still playing',
    WaitingOpponent = 'Waiting opponent'
}

enum GameType {
    Local = 'Local',
    Online = 'Online'
}

@Component({
  selector: 'app-client-homepage',
  templateUrl: './client-homepage.component.html',
  styleUrls: ['./client-homepage.component.css']
})
export class ClientHomepageComponent implements OnInit {
  usernameAuthenticated: string = '';
  player: Player = {};
  searchedPlayer: Player = {};
  isHomeBtnClicked = true;
  isViewAccountInfoBtnClicked = false;
  isEditAccountInfoBtnClicked = false;
  isSearchPlayersBtnClicked = false;
  isScoalaAltfelInfoBtnClicked = false;
  isVisiblePasswordUsername: Boolean = false;
  isVisiblePasswordEmail: Boolean = false;
  isVisiblePasswordPassword: Boolean = false;
  isVisibleNewPassword: Boolean = false;
  isVisibleConfirmNewPassword: Boolean = false;
  isVisibleDeletePassword: Boolean = false;
  isViewMoreInfoBtnClicked = false;
  backendErrorUsername: string = '';
  backendErrorEmail: string = '';
  backendErrorPassword: string = '';
  backendErrorDelete: string = '';
  backendErrorSearchPlayer: string = '';
  successMessageUsername: string = '';
  successMessageEmail: string = '';
  successMessagePassword: string = '';
  newUsername: string = '';
  newEmail: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';
  passwordToConfirmUsername: string = '';
  passwordToConfirmEmail: string = '';
  passwordToConfirmPassword: string = '';
  passwordToConfirmDelete: string = '';
  isEditUsernameBtnClicked = false;
  isEditEmailBtnClicked = false;
  isEditPasswordBtnClicked = false;
  isDeleteAccountBtnClicked = false;
  displaySearchedPlayer = false;
  showJoinOnlineGamePopup: Boolean = false;
  joinOnlineGameCode: string = '';
  victory: number = 0;
  defeat: number = 0;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private playerService: PlayerServiceService,
              public gameService: GameService) {
  }

  ngOnInit(): void {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');

    if (isLoggedIn && username) {
      this.usernameAuthenticated = username;
    }

    this.playerService.getPlayerByName(this.usernameAuthenticated).subscribe(data => this.player = data);
    this.gameService.getMatchesHistory(this.player.id || 0).subscribe(
        result => {
            this.victory = result.victories;
            this.defeat = result.defeats;
            this.player.score = result.score;
        }
    );
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }

  toggleButtonToDisplayForm(button: string): void {
    this.isEditUsernameBtnClicked = button === 'editUsername';
    this.isEditEmailBtnClicked = button === 'editEmail';
    this.isEditPasswordBtnClicked = button === 'editPassword';
    this.isDeleteAccountBtnClicked = button === 'deleteAccount';
  }

  toggleButton(button: string): void {
    this.isViewAccountInfoBtnClicked = button === 'viewAccount';
    this.isEditAccountInfoBtnClicked = button === 'editAccount';
    this.isSearchPlayersBtnClicked = button === 'searchPlayers';
    this.isScoalaAltfelInfoBtnClicked = button === 'scoalaAltfel';
    this.isHomeBtnClicked = button === 'home';
  }

  toogleEditUsername(): void {
    this.toggleButtonToDisplayForm('editUsername');
  }

  toogleEditEmail(): void {
    this.toggleButtonToDisplayForm('editEmail');
  }

  toogleEditPassword(): void {
    this.toggleButtonToDisplayForm('editPassword');
  }

  toogleDeleteAccount(): void {
    this.toggleButtonToDisplayForm('deleteAccount');
  }

  toogleViewAccountDetails(): void {
    this.toggleButton('viewAccount');
  }

  toogleEditAccountDetails(): void {
    this.toggleButton('editAccount');
  }

  toogleScoalaAltfel(): void {
    this.toggleButton('scoalaAltfel');
  }

  toogleSearchPlayers(): void {
    this.toggleButton('searchPlayers');
  }

  toogleHome(): void {
    this.toggleButton('home');
  }

  toggleUsernamePassword(): void {
    this.isVisiblePasswordUsername = !this.isVisiblePasswordUsername;
  }

  toggleEmailPassword(): void {
    this.isVisiblePasswordEmail = !this.isVisiblePasswordEmail;
  }

  togglePasswordPassword(): void {
    this.isVisiblePasswordPassword = !this.isVisiblePasswordPassword;
  }

  toggleNewPassword(): void {
    this.isVisibleNewPassword = !this.isVisibleNewPassword;
  }

  toggleConfirmNewPassword(): void {
    this.isVisibleConfirmNewPassword = !this.isVisibleConfirmNewPassword;
  }

  toggleDeletePassword(): void {
    this.isVisibleDeletePassword = !this.isVisibleDeletePassword;
  }

  toggleViewMoreDetails(): void {
    this.isViewMoreInfoBtnClicked = !this.isViewMoreInfoBtnClicked;
  }

  updateUsername(): void {
    const playerId = this.player.id ?? 0;
    const newUsername = this.newUsername ?? '';
    const password = this.passwordToConfirmUsername ?? '';
    this.playerService.updateUsername(password, newUsername, playerId).subscribe(data => {
      this.player = data
      localStorage.setItem("username", newUsername);
      this.ngOnInit();
      this.successMessageUsername = "Username updated successfully";
      this.backendErrorUsername = '';
      },
      error => {
       this.backendErrorUsername = error.message;
       this.successMessageUsername = '';
      });
    }

  updateEmail(): void {
    const playerId = this.player.id ?? 0;
    const newEmail = this.newEmail ?? '';
    const password = this.passwordToConfirmEmail ?? '';
    this.playerService.updateEmail(password, newEmail, playerId).subscribe(data => {
      this.player = data;
      this.ngOnInit();
      this.successMessageEmail = "Email updated successfully";
      this.backendErrorEmail = '';
    },
    error => {
      this.backendErrorEmail = error.message;
      this.successMessageEmail = '';
    });
  }

  updatePassword(): void {
    const playerId = this.player.id ?? 0;
    const newPassword = this.newPassword ?? '';
    const confirmNewPassword = this.newPassword ?? '';
    const password = this.passwordToConfirmPassword ?? '';
    this.playerService.updatePassword(password, newPassword, confirmNewPassword, playerId).subscribe(data => {
      this.player = data
      this.ngOnInit();
      this.successMessagePassword = "Password updated successfully";
      this.backendErrorPassword = '';
    },
    error => {
      this.backendErrorPassword = error.message;
      this.successMessagePassword = '';
    });
  }

  deletePlayer(): void {
    const playerId = this.player.id ?? 0;
    const password = this.passwordToConfirmDelete ?? '';
    this.playerService.deletePlayer(playerId, password).subscribe(data => {
      this.player = data
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('username');
      this.router.navigate(['/login']);
    },
    error => (this.backendErrorDelete = error.message));
  }

  searchPlayer(playerToSearch: string): void {
    this.playerService.getPlayerByName(playerToSearch).subscribe(
    data => {
      this.searchedPlayer = data;
      this.displaySearchedPlayer = true;
      this.backendErrorSearchPlayer = '';
    },
    error => {
      this.backendErrorSearchPlayer = error.message;
      this.displaySearchedPlayer = false;
    });
  }

  generateRandomCode(): string {
    const code = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    return code;
  }

  startOnlineGame(): void {
    const randomCode = this.generateRandomCode();
    this.gameService.showOnlineCode = true;
    this.gameService.game.type = GameType.Online;
    this.gameService.game.result = ResultMessage.WaitingOpponent;
    this.gameService.game.playerId1 = this.player.id ?? 0;
    this.gameService.game.playerId2 = 0;
    this.gameService.startOnlineGame(randomCode).subscribe(
        result => {
            this.getCurrentOnlineGame();
            this.gameService.webSocketService.connect(randomCode);
            this.router.navigate([`/chess-board/${randomCode}`]);
        }
    );
  }

  joinOnlineGame(randomCode: string): void {
    this.showJoinOnlineGamePopup = false;
    this.gameService.game.playerId2 = this.player.id ?? 0;
    this.gameService.game.result = ResultMessage.StillPlaying;
    const gameId = this.gameService.game.id ?? 0;
    this.gameService.joinOnlineGame(randomCode, this.gameService.game.playerId2).subscribe(
        result => {
            this.getCurrentOnlineGameAfterMatchmaking();
            this.router.navigate([`/chess-board/${randomCode}`]);
    });
  }

  showJoinPopup(): void {
    this.showJoinOnlineGamePopup = true;
  }

  getCurrentOnlineGame(): void {
    const playerId = this.player.id ?? 0;
    this.gameService.getCurrentOnlineGame(playerId, 0).subscribe(
        result => {
          this.gameService.game = result;
          localStorage.setItem('currentGameId', this.gameService.game.id?.toString() ?? '0');
          localStorage.setItem('currentGameType', this.gameService.game.type?.toString() ?? '');
          localStorage.setItem('currentPlayerId1', this.gameService.game.playerId1?.toString() ?? '0');
          localStorage.setItem('currentPositions', JSON.stringify(this.gameService.currentPosition));
          localStorage.setItem('playerTurn', this.gameService.game.playerId1?.toString() ?? '0');
        }
    );
  }

  getCurrentOnlineGameAfterMatchmaking(): void {
      const playerId = this.player.id ?? 0;
      this.gameService.getCurrentOnlineGameAfterMatchmaking(playerId, this.gameService.randomCode).subscribe(
          result => {
            this.gameService.game = result;
            localStorage.setItem('currentGameId', this.gameService.game.id?.toString() ?? '0');
            localStorage.setItem('currentGameType', this.gameService.game.type?.toString() ?? '');
            localStorage.setItem('currentPlayerId2', this.gameService.game.playerId2?.toString() ?? '0');
            localStorage.setItem('currentPositions', JSON.stringify(this.gameService.currentPosition));
            localStorage.setItem('playerTurn', this.gameService.game.playerId1?.toString() ?? '0');
          }
      );
  }

  startLocalGame(): void {
    this.gameService.game.type = GameType.Local;
    this.gameService.game.result = ResultMessage.StillPlaying;
    this.gameService.game.playerId1 = this.player.id ?? 0;
    this.gameService.game.playerId2 = 0;
    this.gameService.startLocalGame().subscribe(
        result => {
            this.getCurrentLocalGame();
            this.gameService.webSocketService.connect('');
            this.router.navigate(['/chess-board']);
        }
    );
  }

  getCurrentLocalGame(): void {
    const playerId = this.player.id ?? 0;
    this.gameService.getCurrentLocalGame(playerId, 0).subscribe(
      result => {
        this.gameService.game = result;
        localStorage.setItem('currentGameId', this.gameService.game.id?.toString() ?? '0');
        localStorage.setItem('currentGameType', this.gameService.game.type?.toString() ?? '');
        localStorage.setItem('currentPlayerId', this.gameService.game.playerId1?.toString() ?? '0');
        localStorage.setItem('currentPositions', JSON.stringify(this.gameService.currentPosition));
        localStorage.setItem('playerTurn', this.gameService.game.playerId1?.toString() ?? '0');
      }
    );
  }

  getHistory(playerId: number) {
    this.gameService.getMatchesHistory(playerId).subscribe(
        result => {
            this.victory = result.victories;
            this.defeat = result.defeats;
            this.player.score = result.score;
            this.searchedPlayer.score = result.score;
        }
    );
  }

  closePopup() {
    this.showJoinOnlineGamePopup = false;
  }
}
