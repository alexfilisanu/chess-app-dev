import { Component, OnInit } from '@angular/core';
import { PlayerServiceService } from '../player-service/player-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Player } from '../player';

@Component({
  selector: 'app-client-homepage',
  templateUrl: './client-homepage.component.html',
  styleUrls: ['./client-homepage.component.css']
})
export class ClientHomepageComponent implements OnInit {
  usernameAuthenticated: string = '';
  player: Player = {};
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
  backendErrorUsername: string = '';
  backendErrorEmail: string = '';
  backendErrorPassword: string = '';
  backendErrorDelete: string = '';
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

  constructor(private route: ActivatedRoute,
              private router: Router,
              private playerService: PlayerServiceService) { }

  ngOnInit(): void {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');

    if (isLoggedIn && username) {
      this.usernameAuthenticated = username;
    }

    this.playerService.getPlayerByName(this.usernameAuthenticated).subscribe(data => this.player = data);
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }

  toggleButton(button: string): void {
    this.isViewAccountInfoBtnClicked = button === 'viewAccount';
    this.isEditAccountInfoBtnClicked = button === 'editAccount';
    this.isSearchPlayersBtnClicked = button === 'searchPlayers';
    this.isScoalaAltfelInfoBtnClicked = button === 'scoalaAltfel';
    this.isHomeBtnClicked = button === 'home';
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
}
