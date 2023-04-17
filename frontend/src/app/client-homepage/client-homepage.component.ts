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
  isVisible: Boolean = false;
  backendError: string = '';
  newUsername: string = '';
  passwordToConfirm: string = '';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private playerService: PlayerServiceService) {
      }

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

  toogleViewAccountDetails(): void {
    this.isViewAccountInfoBtnClicked = !this.isViewAccountInfoBtnClicked;
    this.isEditAccountInfoBtnClicked = false;
    this.isSearchPlayersBtnClicked = false;
    this.isScoalaAltfelInfoBtnClicked = false;
    this.isHomeBtnClicked = false;
  }

  toogleEditAccountDetails(): void {
    this.isEditAccountInfoBtnClicked = !this.isEditAccountInfoBtnClicked;
    this.isViewAccountInfoBtnClicked = false;
    this.isSearchPlayersBtnClicked = false;
    this.isScoalaAltfelInfoBtnClicked = false;
    this.isHomeBtnClicked = false;
  }

  toogleScoalaAltfel(): void {
      this.isScoalaAltfelInfoBtnClicked = !this.isViewAccountInfoBtnClicked;
      this.isViewAccountInfoBtnClicked = false;
      this.isEditAccountInfoBtnClicked = false;
      this.isSearchPlayersBtnClicked = false;
      this.isHomeBtnClicked = false;
  }

  toogleSearchPlayers(): void {
      this.isSearchPlayersBtnClicked = !this.isViewAccountInfoBtnClicked;
      this.isViewAccountInfoBtnClicked = false;
      this.isEditAccountInfoBtnClicked = false;
      this.isScoalaAltfelInfoBtnClicked = false;
      this.isHomeBtnClicked = false;
  }

  toogleHome(): void {
        this.isHomeBtnClicked = !this.isHomeBtnClicked;
        this.isSearchPlayersBtnClicked = false;
        this.isViewAccountInfoBtnClicked = false;
        this.isEditAccountInfoBtnClicked = false;
        this.isScoalaAltfelInfoBtnClicked = false;
    }

    togglePassword(): void {
      this.isVisible = !this.isVisible;
    }

    updateUsername(): void {
       const playerId = this.player.id ?? 0;
       const newUsername = this.newUsername ?? '';
       const password = this.passwordToConfirm ?? '';
       this.playerService.updateUsername(password, newUsername, playerId).subscribe(data => {
          this.player = data
          localStorage.setItem("username", newUsername);
          this.ngOnInit();
       },
       error => (this.backendError = error.message));
    }
}
