import { Component, ViewChild, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { Coord } from './coord'
import { GameService } from '../game-service/game.service';

@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html',
  template: `
      <div>
          <app-square [black]="true">
              <app-knight></app-knight>
          </app-square>
      </div>`,
  styleUrls: ['./chess-board.component.css']
})
export class ChessBoardComponent {
    sixtyFour = new Array(64).fill(0).map((_, i) => i);

    knightPosition$ = this.game.knightPosition$;
    pawnPosition$ = this.game.pawnPosition$;
    rookPosition$ = this.game.rookPosition$;
    bishopPosition$ = this.game.bishopPosition$;
    queenPosition$ = this.game.queenPosition$;
    kingPosition$ = this.game.kingPosition$;

    selectedPosition: Coord | undefined;

    constructor(private router: Router, public game: GameService) {
    }

    xy(i: number): Coord {
          return {
              x: i % 8,
              y: Math.floor(i / 8)
        }
    }

    isBlack({ x, y }: Coord) {
            return (x + y) % 2 === 1;
    }

      isSquareSelected(pos: Coord) {
        return (
          this.selectedPosition &&
          this.selectedPosition.x === pos.x &&
          this.selectedPosition.y === pos.y
        );
      }


      handleSquareClick(pos: Coord) {
        if (this.selectedPosition) {
          const pieceType = this.game.getPieceType(this.selectedPosition);
          if (!this.game.isPieceAt(pos)) {
            switch(pieceType) {
              case "knight":
                if (this.game.canMoveKnight(this.selectedPosition, pos)) {
                  this.game.moveKnight(this.selectedPosition, pos);
                }
                break;
              case "pawn":
                if (this.game.canMovePawn(this.selectedPosition, pos)) {
                  this.game.movePawn(this.selectedPosition, pos);
                }
                break;
              case "rook":
                if (this.game.canMoveRook(this.selectedPosition, pos)) {
                  this.game.moveRook(this.selectedPosition, pos);
                }
                break;
              case "bishop":
                if (this.game.canMoveBishop(this.selectedPosition, pos)) {
                  this.game.moveBishop(this.selectedPosition, pos);
                }
                break;
              case "queen":
                if (this.game.canMoveQueen(this.selectedPosition, pos)) {
                  this.game.moveQueen(this.selectedPosition, pos);
                }
                break;
              case "king":
                if (this.game.canMoveKing(this.selectedPosition, pos)) {
                  this.game.moveKing(this.selectedPosition, pos);
                }
                break;
            }
            this.selectedPosition = undefined;
          }
        } else {
          this.selectedPosition = pos;
        }
      }
}
