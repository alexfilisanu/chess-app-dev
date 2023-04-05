import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from '../player';
import { Observable } from 'rxjs';

@Injectable()
export class PlayerServiceService {
    baseUrl: string;
    players: Player[] = [];

   constructor(private http: HttpClient) {
      this.baseUrl = 'http://localhost:8090/api/v1/chess-app';
    }

   public findAll(): Observable<Player[]> {
      return this.http.get<Player[]>(`${this.baseUrl}/players`);
   }

   getPlayerById(playerId: number): Observable<Player> {
       return this.http.get<Player>(`${this.baseUrl}/player-by-id/${playerId}`);
     }

   public save(newPlayer: Player) {
      return this.http.post<Player>(`${this.baseUrl}/register`, newPlayer);
   }
}




