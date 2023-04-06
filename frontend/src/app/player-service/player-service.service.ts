import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Player } from '../player';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class PlayerServiceService {
		baseUrl: string;
		players: Player[] = [];

    constructor(private http: HttpClient) {
        this.baseUrl = 'http://localhost:8090/api/v1/chess-app';
		}

	  public getPlayers(): Observable<Player[]> {
			  return this.http.get<Player[]>(`${this.baseUrl}/players`);
	  }

	  public getPlayerById(playerId: number): Observable<Player> {
			  return this.http.get<Player>(`${this.baseUrl}/player-by-id/${playerId}`);
		}

		public checkLoginCredentials(playerName: string, playerPassword: string): Observable<Player> {
        const url = `${this.baseUrl}/player-by-name/${playerName}?playerPassword=${playerPassword}`;
        return this.http.get<Player>(url).pipe(
        				    catchError((error: HttpErrorResponse, caught: Observable<any>) => {
        						    if (!(error.error instanceof ErrorEvent)) {
        										return throwError(error.error);
        						    }
        						    return caught;
        					  })
        				);
    }

    public registerNewPlayer(newPlayer: Player) {
        const url = `${this.baseUrl}/register`;
				return this.http.post<Player>(url, newPlayer).pipe(
				    catchError((error: HttpErrorResponse, caught: Observable<any>) => {
						    if (!(error.error instanceof ErrorEvent)) {
										return throwError(error.error);
						    }
						    return caught;
					  })
				);
	  }
}
