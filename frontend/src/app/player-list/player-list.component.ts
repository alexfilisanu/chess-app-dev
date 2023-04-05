import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from '../player';
import { Observable } from 'rxjs/Observable';
import { PlayerServiceService } from '../player-service/player-service.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})

export class PlayerListComponent implements OnInit {

  players: Player[] = [];
  isClicked: Boolean = false;

  constructor(private playerService: PlayerServiceService) {
  }

  ngOnInit() {
      this.playerService.findAll().subscribe(data => {
        this.players = data;
      });
   }
}
