import { Component, ViewChild, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { Coord } from './coord'
import { GameService } from '../game-service/game.service';

enum Color {
    White = 'white',
    Black = 'black'
}

enum PieceType {
    King = 'king',
    Queen = 'queen',
    Rook = 'rook',
    Bishop = 'bishop',
    Knight = 'knight',
    Pawn = 'pawn'
}

@Component({
    selector: 'app-chess-board',
    templateUrl: './chess-board.component.html',
    styleUrls: ['./chess-board.component.css']
})
export class ChessBoardComponent {
    sixtyFour = new Array(64).fill(0).map((_, i) => i);

    rookPosition1W$ = this.game.rookPosition1W$;
    knightPosition1W$ = this.game.knightPosition1W$;
    bishopPosition1W$ = this.game.bishopPosition1W$;
    queenPositionW$ = this.game.queenPositionW$;
    kingPositionW$ = this.game.kingPositionW$;
    bishopPosition2W$ = this.game.bishopPosition2W$;
    knightPosition2W$ = this.game.knightPosition2W$;
    rookPosition2W$ = this.game.rookPosition2W$;
    pawnPosition1W$ = this.game.pawnPosition1W$;
    pawnPosition2W$ = this.game.pawnPosition2W$;
    pawnPosition3W$ = this.game.pawnPosition3W$;
    pawnPosition4W$ = this.game.pawnPosition4W$;
    pawnPosition5W$ = this.game.pawnPosition5W$;
    pawnPosition6W$ = this.game.pawnPosition6W$;
    pawnPosition7W$ = this.game.pawnPosition7W$;
    pawnPosition8W$ = this.game.pawnPosition8W$;

    rookPosition1B$ = this.game.rookPosition1B$;
    knightPosition1B$ = this.game.knightPosition1B$;
    bishopPosition1B$ = this.game.bishopPosition1B$;
    queenPositionB$ = this.game.queenPositionB$;
    kingPositionB$ = this.game.kingPositionB$;
    bishopPosition2B$ = this.game.bishopPosition2B$;
    knightPosition2B$ = this.game.knightPosition2B$;
    rookPosition2B$ = this.game.rookPosition2B$;
    pawnPosition1B$ = this.game.pawnPosition1B$;
    pawnPosition2B$ = this.game.pawnPosition2B$;
    pawnPosition3B$ = this.game.pawnPosition3B$;
    pawnPosition4B$ = this.game.pawnPosition4B$;
    pawnPosition5B$ = this.game.pawnPosition5B$;
    pawnPosition6B$ = this.game.pawnPosition6B$;
    pawnPosition7B$ = this.game.pawnPosition7B$;
    pawnPosition8B$ = this.game.pawnPosition8B$;

    selectedPosition: Coord | undefined;

    validMoves: Coord[] = [];

    colorToMove: Color = Color.White;

    isWhiteKingInCheck: boolean = false;
    isBlackKingInCheck: boolean = false;

    constructor(private router: Router, public game: GameService) { }

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
        return this.selectedPosition
            && this.selectedPosition.x === pos.x
            && this.selectedPosition.y === pos.y;
    }

    isValidMove(pos: Coord): boolean {
        if (this.selectedPosition) {
            const pieceType = this.game.getPieceInfo(this.selectedPosition);
            if (pieceType.color === this.colorToMove) {
                this.validMoves = this.game.getValidMoves(pieceType, this.selectedPosition);
            }
        }

        return this.validMoves
            && this.validMoves.some(vm => vm.x === pos.x && vm.y === pos.y);
    }

    changeTurns() {
        this.colorToMove = (this.colorToMove === Color.White) ? Color.Black : Color.White;
    }

    isColorToMove(color: string): boolean {
        return color === this.colorToMove;
    }

    isKingInCheck(color: string) {
        const kingPos = (color === Color.White)
            ? this.kingPositionB$.getValue()
            : this.kingPositionW$.getValue();
        const pieces = Object.values(this.game.currentPosition);

        for (const piece of pieces) {
            const targetPiece = this.game.getPieceInfo(piece);
            if (targetPiece.color === color) {
                if (this.game.getValidMoves(targetPiece, piece).some(vm => vm.x === kingPos.x && vm.y === kingPos.y)) {
                    (color === Color.White)
                        ? this.isBlackKingInCheck = true
                        : this.isWhiteKingInCheck = true;
                    return;
                }
            }
        }

        (color === Color.White)
            ? this.isWhiteKingInCheck = false
            : this.isBlackKingInCheck = false;
    }

    handleSquareClick(pos: Coord) {
        if (this.selectedPosition) {
            const pieceType = this.game.getPieceInfo(this.selectedPosition).type;
            const index = this.game.getPieceInfo(this.selectedPosition).index;
            const color = this.game.getPieceInfo(this.selectedPosition).color;

            if (!this.game.isPieceAt(pos) || this.game.isOpponentAt(pos, color)) {
                switch(pieceType) {
                    case PieceType.King:
                        if (this.game.canMoveKing(index, color, this.selectedPosition, pos)
                                && this.isColorToMove(color) && !this.game.areKingsAdjacent(pos, color)) {
                            this.game.moveKing(index, color, this.selectedPosition, pos);
                            this.isKingInCheck(color);
                            this.changeTurns();
                        }
                        break;

                    case PieceType.Queen:
                        if (this.game.canMoveQueen(index, color, this.selectedPosition, pos)
                                && this.isColorToMove(color)) {
                            this.game.moveQueen(index, color, this.selectedPosition, pos);
                            this.isKingInCheck(color);
                            this.changeTurns();
                        }
                        break;

                    case PieceType.Rook:
                        if (this.game.canMoveRook(index, color, this.selectedPosition, pos)
                                && this.isColorToMove(color)) {
                            this.game.moveRook(index, color, this.selectedPosition, pos);
                            this.isKingInCheck(color);
                            this.changeTurns();
                        }
                        break;

                    case PieceType.Bishop:
                        if (this.game.canMoveBishop(index, color, this.selectedPosition, pos)
                                && this.isColorToMove(color)) {
                            this.game.moveBishop(index, color, this.selectedPosition, pos);
                            this.isKingInCheck(color);
                            this.changeTurns();
                        }
                        break;

                    case PieceType.Knight:
                        if (this.game.canMoveKnight(index, color, this.selectedPosition, pos)
                                && this.isColorToMove(color)) {
                            this.game.moveKnight(index, color, this.selectedPosition, pos);
                            this.isKingInCheck(color);
                            this.changeTurns();
                        }
                        break;

                    case PieceType.Pawn:
                        if ((this.game.canMovePawn(index, color, this.selectedPosition, pos)
                                || (this.game.isOpponentAt(pos, color)
                                    && (this.selectedPosition.x == pos.x + 1 || this.selectedPosition.x == pos.x - 1)))
                                && this.isColorToMove(color)) {
                            this.game.movePawn(index, color, this.selectedPosition, pos);
                            this.isKingInCheck(color);
                            this.changeTurns();
                        }
                        break;

                    default:
                        break;
                }

                this.validMoves = [];
                this.selectedPosition = undefined;
                console.log("white check: ", this.isWhiteKingInCheck);
                console.log("black check: ", this.isBlackKingInCheck);
            }
        } else {
            this.selectedPosition = pos;
        }
    }
}
