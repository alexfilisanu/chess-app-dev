import { Component, ViewChild, AfterViewInit, ElementRef, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Coord } from './coord'
import { GameService } from '../game-service/game.service';
import { Subject } from 'rxjs';

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
export class ChessBoardComponent implements OnInit {
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

    safePositions: Coord[] = [];

    colorToMove: Color = Color.White;

    showPopup: Boolean = false;
    isWinForWhite: Boolean = false;
    isWinForBlack: Boolean = false;

    popupSubject: Subject<boolean> = new Subject<boolean>();

    @ViewChild('popup') popup!: ElementRef;

    constructor(private router: Router, public game: GameService) {}

    ngOnInit(): void {
        this.updateIsValidMoves();
        this.popupSubject.subscribe((showPopup) => {
            const popup = this.popup?.nativeElement;
            if (popup) {
                if (showPopup) {
                    popup.style.display = 'block';
                } else {
                    popup.style.display = 'none';
                }
            }
        });
    }

    gotoClientHomePage(): void {
        this.router.navigate(['/client-homepage']);
    }

    closePopup() {
        this.showPopup = false;
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
        return this.selectedPosition
            && this.selectedPosition.x === pos.x
            && this.selectedPosition.y === pos.y;
    }

    isValidMoves: boolean[] = [];

    isValidMove(pos: Coord): boolean {
        if (this.selectedPosition) {
            const pieceInfo = this.game.getPieceInfo(this.selectedPosition);

            if (this.isColorToMove(pieceInfo.color)) {
                const isKingInCheck = this.game.isColorKingInCheck(pieceInfo.color);

                this.validMoves = isKingInCheck
                    ? this.game.getSafePositions(pieceInfo, this.selectedPosition)
                    : this.game.canMovePieceWithoutLettingKingInCheck(this.selectedPosition, pieceInfo.color)
                        ? this.game.getValidMoves(pieceInfo, this.selectedPosition)
                        : this.game.getValidMovesToCaptureTargetPiece(pieceInfo, this.selectedPosition);
            }
        }

        return this.validMoves.some(vm => vm.x === pos.x && vm.y === pos.y);
    }

    updateIsValidMoves() {
        const isValidMoves: boolean[] = [];
        for (let i = 0; i < 64; i++) {
            const pos = this.xy(i);

            isValidMoves[i] = this.isValidMove(pos);
        }

        this.isValidMoves = isValidMoves;
    }

    isColorToMove(color: string): boolean {
        return color === this.colorToMove;
    }

    changeTurns() {
        this.colorToMove = this.isColorToMove(Color.White)
            ? Color.Black
            : Color.White;
    }

    handleSquareClick(pos: Coord) {
        if (this.selectedPosition) {
            const type = this.game.getPieceInfo(this.selectedPosition).type;
            const index = this.game.getPieceInfo(this.selectedPosition).index;
            const color = this.game.getPieceInfo(this.selectedPosition).color;
            const isKingInCheck = this.game.isColorKingInCheck(color);

            if (!isKingInCheck) {
                if (!this.game.isPieceAt(pos) || this.game.isOpponentAt(pos, color)) {
                    if (this.game.canMovePieceWithoutLettingKingInCheck(this.selectedPosition, color)) {
                        switch(type) {
                            case PieceType.King:
                                if (this.game.canMoveKing(index, color, this.selectedPosition, pos)
                                        && this.isColorToMove(color)
                                        && this.game.isNewKingPositionNotInCheck(pos, color)
                                        && !this.game.areKingsAdjacent(pos, color)) {
                                    this.game.moveKing(index, color, this.selectedPosition, pos);
                                    this.game.kingHasMoved(color);
                                    this.game.setOppositeColorKingInCheck(color);
                                    this.changeTurns();
                                } else if (this.game.isShortCastlingAvailable(color)
                                            && this.game.isShortCastlingRequired(color, pos)
                                            && this.isColorToMove(color)
                                            && this.game.isNewKingPositionNotInCheck(pos, color)) {
                                    this.game.moveShortCastling(color);
                                    this.game.kingHasMoved(color);
                                    this.game.rookHasMoved(2, color);
                                    this.game.setOppositeColorKingInCheck(color);
                                    this.changeTurns();
                                } else if (this.game.isLongCastlingAvailable(color)
                                            && this.game.isLongCastlingRequired(color, pos)
                                            && this.isColorToMove(color)
                                            && this.game.isNewKingPositionNotInCheck(pos, color)) {
                                    this.game.moveLongCastling(color);
                                    this.game.kingHasMoved(color);
                                    this.game.rookHasMoved(1, color);
                                    this.game.setOppositeColorKingInCheck(color);
                                    this.changeTurns();
                                }
                                break;

                            case PieceType.Queen:
                                if (this.game.canMoveQueen(index, color, this.selectedPosition, pos)
                                        && this.isColorToMove(color)) {
                                    this.game.moveQueen(index, color, this.selectedPosition, pos);
                                    this.game.setOppositeColorKingInCheck(color);
                                    this.changeTurns();
                                }
                                break;

                            case PieceType.Rook:
                                if (this.game.canMoveRook(index, color, this.selectedPosition, pos)
                                        && this.isColorToMove(color)) {
                                    this.game.moveRook(index, color, this.selectedPosition, pos);
                                    this.game.rookHasMoved(index, color);
                                    this.game.setOppositeColorKingInCheck(color);
                                    this.changeTurns();
                                }
                                break;

                            case PieceType.Bishop:
                                if (this.game.canMoveBishop(index, color, this.selectedPosition, pos)
                                        && this.isColorToMove(color)) {
                                    this.game.moveBishop(index, color, this.selectedPosition, pos);
                                    this.game.setOppositeColorKingInCheck(color);
                                    this.changeTurns();
                                }
                                break;

                            case PieceType.Knight:
                                if (this.game.canMoveKnight(index, color, this.selectedPosition, pos)
                                        && this.isColorToMove(color)) {
                                    this.game.moveKnight(index, color, this.selectedPosition, pos);
                                    this.game.setOppositeColorKingInCheck(color);
                                    this.changeTurns();
                                }
                                break;

                            case PieceType.Pawn:
                                if ((this.game.canMovePawn(index, color, this.selectedPosition, pos)
                                        || (this.game.isOpponentAt(pos, color)
                                            && (this.selectedPosition.x == pos.x + 1 || this.selectedPosition.x == pos.x - 1)))
                                        && this.isColorToMove(color)) {
                                    this.game.movePawn(index, color, this.selectedPosition, pos);
                                    this.game.setOppositeColorKingInCheck(color);
                                    this.changeTurns();
                                }
                                break;

                            default:
                                break;
                        }
                    } else {
                        switch (type) {
                            case PieceType.Queen:
                                if (this.game.canMoveQueen(index, color, this.selectedPosition, pos)
                                        && this.game.isOpponentAt(pos, color)
                                        && this.isColorToMove(color)) {
                                    this.game.moveQueen(index, color, this.selectedPosition, pos);
                                    this.game.setOppositeColorKingInCheck(color);
                                    this.changeTurns();
                                }
                                break;

                            case PieceType.Rook:
                                if (this.game.canMoveRook(index, color, this.selectedPosition, pos)
                                        && this.game.isOpponentAt(pos, color)
                                        && this.isColorToMove(color)) {
                                    this.game.moveRook(index, color, this.selectedPosition, pos);
                                    this.game.rookHasMoved(index, color);
                                    this.game.setOppositeColorKingInCheck(color);
                                    this.changeTurns();
                                }
                                break;

                            case PieceType.Bishop:
                                if (this.game.canMoveBishop(index, color, this.selectedPosition, pos)
                                        && this.game.isOpponentAt(pos, color)
                                        && this.isColorToMove(color)) {
                                    this.game.moveBishop(index, color, this.selectedPosition, pos);
                                    this.game.setOppositeColorKingInCheck(color);
                                    this.changeTurns();
                                }
                                break;

                            case PieceType.Pawn:
                                if ((this.selectedPosition.x == pos.x + 1 || this.selectedPosition.x == pos.x - 1)
                                        && this.isColorToMove(color)) {
                                    this.game.movePawn(index, color, this.selectedPosition, pos);
                                    this.game.setOppositeColorKingInCheck(color);
                                    this.changeTurns();
                                }
                                break;

                            default:
                                break;
                        }
                    }

                    this.validMoves = [];
                    this.selectedPosition = undefined;
                    this.ngOnInit();
                }
            } else {
                if (!this.game.isCheckmate(color)) {
                    const targetPiece = this.game.getPieceInfo(this.selectedPosition);
                    const safePositions = this.game.getSafePositions(targetPiece, this.selectedPosition);

                    if (safePositions.length != 0) {
                        if (safePositions.some(vm => vm.x === pos.x && vm.y === pos.y)) {
                            switch(targetPiece.type) {
                                case PieceType.King:
                                    this.game.moveKing(index, color, this.selectedPosition, pos);
                                    break;

                                case PieceType.Queen:
                                    this.game.moveQueen(index, color, this.selectedPosition, pos);
                                    break;

                                case PieceType.Rook:
                                    this.game.moveRook(index, color, this.selectedPosition, pos);
                                    break;

                                case PieceType.Bishop:
                                    this.game.moveBishop(index, color, this.selectedPosition, pos);
                                    break;

                                case PieceType.Knight:
                                    this.game.moveKnight(index, color, this.selectedPosition, pos);
                                    break;

                                case PieceType.Pawn:
                                    this.game.movePawn(index, color, this.selectedPosition, pos);
                                    break;

                                default:
                                    break;
                            }

                            this.game.setOppositeColorKingInCheck(color);
                            this.changeTurns();
                        }
                    }
                    this.validMoves = [];
                    this.selectedPosition = undefined;
                    this.ngOnInit();
                } else {
                    color === Color.Black
                        ? this.isWinForWhite = true
                        : this.isWinForBlack = true;

                    this.showPopup = true;
                    this.popupSubject.next(true);
                }
            }
        } else {
            this.selectedPosition = pos;
            this.ngOnInit();
        }
    }
}
