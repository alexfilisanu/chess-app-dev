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

    rookPosition1$ = this.game.rookPosition1$;
    knightPosition1$ = this.game.knightPosition1$;
    bishopPosition1$ = this.game.bishopPosition1$;
    queenPosition$ = this.game.queenPosition$;
    kingPosition$ = this.game.kingPosition$;
    bishopPosition2$ = this.game.bishopPosition2$;
    knightPosition2$ = this.game.knightPosition2$;
    rookPosition2$ = this.game.rookPosition2$;
    pawnPosition1$ = this.game.pawnPosition1$;
    pawnPosition2$ = this.game.pawnPosition2$;
    pawnPosition3$ = this.game.pawnPosition3$;
    pawnPosition4$ = this.game.pawnPosition4$;
    pawnPosition5$ = this.game.pawnPosition5$;
    pawnPosition6$ = this.game.pawnPosition6$;
    pawnPosition7$ = this.game.pawnPosition7$;
    pawnPosition8$ = this.game.pawnPosition8$;

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
        const pieceType = this.game.getPieceType(this.selectedPosition).piece;
        const index = this.game.getPieceType(this.selectedPosition).index;
        if (!this.game.isPieceAt(pos)) {
          switch(pieceType) {
          case "knight":
            if (this.game.canMoveKnight(index, this.selectedPosition, pos)) {
              this.game.moveKnight(index, this.selectedPosition, pos);
            }
            break;
          case "pawn":
            if (this.game.canMovePawn(index, this.selectedPosition, pos)) {
              this.game.movePawn(index, this.selectedPosition, pos);
            }
            break;
          case "rook":
            if (this.game.canMoveRook(index, this.selectedPosition, pos)) {
              this.game.moveRook(index, this.selectedPosition, pos);
            }
            break;
          case "bishop":
            if (this.game.canMoveBishop(index, this.selectedPosition, pos)) {
              this.game.moveBishop(index, this.selectedPosition, pos);
            }
            break;
          case "queen":
            if (this.game.canMoveQueen(index, this.selectedPosition, pos)) {
              this.game.moveQueen(index, this.selectedPosition, pos);
            }
            break;
          case "king":
            if (this.game.canMoveKing(index, this.selectedPosition, pos)) {
              this.game.moveKing(index, this.selectedPosition, pos);
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
