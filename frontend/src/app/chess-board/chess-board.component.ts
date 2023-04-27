import { Component, ViewChild, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { Coord } from './coord'
import { GameService } from '../game-service/game.service';

@Component({
  selector: 'app-chess-board',
  templateUrl: './chess-board.component.html',
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

    validMoves: Coord[] = [];

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

      isValidMove(pos: Coord): boolean {
          // check if validMoves is defined and check if pos is in validMoves
          if (this.selectedPosition) {
            const pieceType = this.game.getPieceType(this.selectedPosition);
            console.log(pieceType)
            this.validMoves = this.game.getValidMoves(pieceType, this.selectedPosition);
            console.log(this.validMoves)
          }
          return this.validMoves && this.validMoves.some(vm => vm.x === pos.x && vm.y === pos.y);
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
            this.validMoves = [];
            this.selectedPosition = undefined;
          }
        } else {

          this.selectedPosition = pos;
        }
      }
}
