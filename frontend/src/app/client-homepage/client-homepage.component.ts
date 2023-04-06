import { Component, OnInit } from '@angular/core';
import { PlayerServiceService } from '../player-service/player-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Player } from '../player';

@Component({
  selector: 'app-client-homepage',
  templateUrl: './client-homepage.component.html',
  styleUrls: ['./client-homepage.component.css']
})
export class ClientHomepageComponent implements OnInit {
  constructor(private route: ActivatedRoute,
              private router: Router,
              private playerService: PlayerServiceService) {
      }

  usernameAuthenticated: String = '';

  ngOnInit(): void {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const username = localStorage.getItem('username');

    if (isLoggedIn && username) {
      this.usernameAuthenticated = username;
    }
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }
}
