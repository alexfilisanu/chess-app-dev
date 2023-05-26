import { Component, ViewChild, AfterViewInit, ElementRef, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Coord } from './coord'
import { GameService } from '../game-service/game.service';
import { PlayerServiceService } from '../player-service/player-service.service';
import { Subject } from 'rxjs';
import { Game } from '../game';

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

enum ResultMessage {
    WinPlayer1 = 'Win player1',
    WinPlayer2 = 'Win player2',
    Draw = 'Draw',
    StillPlaying = 'Still playing'
}

@Component({
    selector: 'app-chess-board',
    templateUrl: './chess-board.component.html',
    styleUrls: ['./chess-board.component.css']
})
export class ChessBoardComponent implements OnInit {
    sixtyFour = new Array(64).fill(0).map((_, i) => i);

    rook1W = this.gameService.rookPosition1W$;
    knight1W = this.gameService.knightPosition1W$;
    bishop1W = this.gameService.bishopPosition1W$;
    queenW = this.gameService.queenPositionW$;
    kingW = this.gameService.kingPositionW$;
    bishop2W = this.gameService.bishopPosition2W$;
    knight2W = this.gameService.knightPosition2W$;
    rook2W = this.gameService.rookPosition2W$;
    pawn1W = this.gameService.pawnPosition1W$;
    pawn2W = this.gameService.pawnPosition2W$;
    pawn3W = this.gameService.pawnPosition3W$;
    pawn4W = this.gameService.pawnPosition4W$;
    pawn5W = this.gameService.pawnPosition5W$;
    pawn6W = this.gameService.pawnPosition6W$;
    pawn7W = this.gameService.pawnPosition7W$;
    pawn8W = this.gameService.pawnPosition8W$;

    rook1B = this.gameService.rookPosition1B$;
    knight1B = this.gameService.knightPosition1B$;
    bishop1B = this.gameService.bishopPosition1B$;
    queenB = this.gameService.queenPositionB$;
    kingB = this.gameService.kingPositionB$;
    bishop2B = this.gameService.bishopPosition2B$;
    knight2B = this.gameService.knightPosition2B$;
    rook2B = this.gameService.rookPosition2B$;
    pawn1B = this.gameService.pawnPosition1B$;
    pawn2B = this.gameService.pawnPosition2B$;
    pawn3B = this.gameService.pawnPosition3B$;
    pawn4B = this.gameService.pawnPosition4B$;
    pawn5B = this.gameService.pawnPosition5B$;
    pawn6B = this.gameService.pawnPosition6B$;
    pawn7B = this.gameService.pawnPosition7B$;
    pawn8B = this.gameService.pawnPosition8B$;

    selectedPosition: Coord | undefined;

    validMoves: Coord[] = [];

    safePositions: Coord[] = [];

    colorToMove: Color = Color.White;

    showPopup: Boolean = false;
    isWinForWhite: Boolean = false;
    isWinForBlack: Boolean = false;

    popupSubject: Subject<boolean> = new Subject<boolean>();

    @ViewChild('popup') popup!: ElementRef;

    constructor(private route: ActivatedRoute, private router: Router, public gameService: GameService) { }

    game: Game = new Game();

    ngOnInit(): void {
        this.gameService.webSocketService.connect('123456');
        this.gameService.webSocketService.getMessage().subscribe((message: any) => {
            const actualMessage = message.message;
            const gameid = actualMessage.gameid;
            const playerid = actualMessage.playerid;
            const playerturn = actualMessage.playerturn;
            const moves = actualMessage.moves;

            const playerTurn = playerturn !== playerid
                ? playerid
                : '0';

            localStorage.setItem('currentPositions', moves);
            localStorage.setItem('playerTurn', playerTurn);

            const pieces = JSON.parse(moves);
            for (const key in pieces) {
              (this as any)[key].next(pieces[key]);
            }
        });

        const positions = localStorage.getItem('currentPositions');
        if (positions !== null) {
            const pieces = JSON.parse(positions);
            for (const key in pieces) {
              (this as any)[key].next(pieces[key]);
            }
        }

        this.colorToMove = localStorage.getItem('playerTurn') === '0'
            ? Color.Black
            : Color.White;

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

    leaveGame(): void {
        this.showPopup = true;
        this.popupSubject.next(true);

        this.isWinForWhite = this.isColorToMove(Color.Black);
        this.isWinForBlack = !this.isWinForWhite;
    }

    sendMessage(message: any): void {
        const gameid = Number(localStorage.getItem('currentGameId')) || 0;
        const playerid = Number(localStorage.getItem('currentPlayerId')) || 0;
        const playerturn = Number(localStorage.getItem('playerTurn')) || 0;
        const gametype = localStorage.getItem('currentGameType') || '';
        const messageToSend = {
            message,
            gameid,
            playerid,
            playerturn,
            gametype
        };

        this.gameService.webSocketService.sendMessage(messageToSend);
    }

    closePopup() {
        this.endLocalGame();
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
            const pieceInfo = this.gameService.getPieceInfo(this.selectedPosition);

            if (this.isColorToMove(pieceInfo.color)) {
                const isKingInCheck = this.gameService.isColorKingInCheck(pieceInfo.color);

                this.validMoves = isKingInCheck
                    ? this.gameService.getSafePositions(pieceInfo, this.selectedPosition)
                    : this.gameService.canMovePieceWithoutLettingKingInCheck(this.selectedPosition, pieceInfo.color)
                        ? this.gameService.getValidMoves(pieceInfo, this.selectedPosition)
                        : this.gameService.getValidMovesToCaptureTargetPiece(pieceInfo, this.selectedPosition);
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
        // verific in cazul Online Game daca oponentul a apasat ABANDON si jocul s a terminat,
        // caz in care jocul se va incheia si pentru jucator
        const gameid = Number(localStorage.getItem('currentGameId')) || 0;
        this.gameService.getGameResult(gameid).subscribe(
            result => {
                this.gameService.game = result;
            }
        );
        if (this.gameService.game.result === ResultMessage.WinPlayer1 || this.gameService.game.result === ResultMessage.WinPlayer2) {
            this.leaveGame();
        }

        if (this.selectedPosition) {
            const type = this.gameService.getPieceInfo(this.selectedPosition).type;
            const index = this.gameService.getPieceInfo(this.selectedPosition).index;
            const color = this.gameService.getPieceInfo(this.selectedPosition).color;
            const isKingInCheck = this.gameService.isColorKingInCheck(color);

            if (!isKingInCheck) {
                if (!this.gameService.isPieceAt(pos) || this.gameService.isOpponentAt(pos, color)) {
                    if (this.gameService.canMovePieceWithoutLettingKingInCheck(this.selectedPosition, color)) {
                        switch(type) {
                            case PieceType.King:
                                if (this.gameService.canMoveKing(index, color, this.selectedPosition, pos)
                                        && this.isColorToMove(color)
                                        && this.gameService.isNewKingPositionNotInCheck(pos, color)
                                        && !this.gameService.areKingsAdjacent(pos, color)) {
                                    this.gameService.moveKing(index, color, this.selectedPosition, pos);
                                    this.gameService.kingHasMoved(color);
                                    this.gameService.setOppositeColorKingInCheck(color);
                                    this.changeTurns();
                                    this.sendMessage(this.gameService.currentPosition);
                                } else if (this.gameService.isShortCastlingAvailable(color)
                                            && this.gameService.isShortCastlingRequired(color, pos)
                                            && this.isColorToMove(color)
                                            && this.gameService.isNewKingPositionNotInCheck(pos, color)) {
                                    this.gameService.moveShortCastling(color);
                                    this.gameService.kingHasMoved(color);
                                    this.gameService.rookHasMoved(2, color);
                                    this.gameService.setOppositeColorKingInCheck(color);
                                    this.changeTurns();
                                    this.sendMessage(this.gameService.currentPosition);
                                } else if (this.gameService.isLongCastlingAvailable(color)
                                            && this.gameService.isLongCastlingRequired(color, pos)
                                            && this.isColorToMove(color)
                                            && this.gameService.isNewKingPositionNotInCheck(pos, color)) {
                                    this.gameService.moveLongCastling(color);
                                    this.gameService.kingHasMoved(color);
                                    this.gameService.rookHasMoved(1, color);
                                    this.gameService.setOppositeColorKingInCheck(color);
                                    this.changeTurns();
                                    this.sendMessage(this.gameService.currentPosition);
                                }
                                break;

                            case PieceType.Queen:
                                if (this.gameService.canMoveQueen(index, color, this.selectedPosition, pos)
                                        && this.isColorToMove(color)) {
                                    this.gameService.moveQueen(index, color, this.selectedPosition, pos);
                                    this.gameService.setOppositeColorKingInCheck(color);
                                    this.changeTurns();
                                    this.sendMessage(this.gameService.currentPosition);
                                }
                                break;

                            case PieceType.Rook:
                                if (this.gameService.canMoveRook(index, color, this.selectedPosition, pos)
                                        && this.isColorToMove(color)) {
                                    this.gameService.moveRook(index, color, this.selectedPosition, pos);
                                    this.gameService.rookHasMoved(index, color);
                                    this.gameService.setOppositeColorKingInCheck(color);
                                    this.changeTurns();
                                    this.sendMessage(this.gameService.currentPosition);
                                }
                                break;

                            case PieceType.Bishop:
                                if (this.gameService.canMoveBishop(index, color, this.selectedPosition, pos)
                                        && this.isColorToMove(color)) {
                                    this.gameService.moveBishop(index, color, this.selectedPosition, pos);
                                    this.gameService.setOppositeColorKingInCheck(color);
                                    this.changeTurns();
                                    this.sendMessage(this.gameService.currentPosition);
                                }
                                break;

                            case PieceType.Knight:
                                if (this.gameService.canMoveKnight(index, color, this.selectedPosition, pos)
                                        && this.isColorToMove(color)) {
                                    this.gameService.moveKnight(index, color, this.selectedPosition, pos);
                                    this.gameService.setOppositeColorKingInCheck(color);
                                    this.changeTurns();
                                    this.sendMessage(this.gameService.currentPosition);
                                }
                                break;

                            case PieceType.Pawn:
                                if ((this.gameService.canMovePawn(index, color, this.selectedPosition, pos)
                                        || (this.gameService.isOpponentAt(pos, color)
                                            && (this.selectedPosition.x == pos.x + 1 || this.selectedPosition.x == pos.x - 1)))
                                        && this.isColorToMove(color)) {
                                    this.gameService.movePawn(index, color, this.selectedPosition, pos);
                                    this.gameService.setOppositeColorKingInCheck(color);
                                    this.changeTurns();
                                    this.sendMessage(this.gameService.currentPosition);
                                }
                                break;

                            default:
                                break;
                        }
                    } else {
                        switch (type) {
                            case PieceType.Queen:
                                if (this.gameService.canMoveQueen(index, color, this.selectedPosition, pos)
                                        && this.gameService.isOpponentAt(pos, color)
                                        && this.isColorToMove(color)) {
                                    this.gameService.moveQueen(index, color, this.selectedPosition, pos);
                                    this.gameService.setOppositeColorKingInCheck(color);
                                    this.changeTurns();
                                    this.sendMessage(this.gameService.currentPosition);
                                }
                                break;

                            case PieceType.Rook:
                                if (this.gameService.canMoveRook(index, color, this.selectedPosition, pos)
                                        && this.gameService.isOpponentAt(pos, color)
                                        && this.isColorToMove(color)) {
                                    this.gameService.moveRook(index, color, this.selectedPosition, pos);
                                    this.gameService.rookHasMoved(index, color);
                                    this.gameService.setOppositeColorKingInCheck(color);
                                    this.changeTurns();
                                    this.sendMessage(this.gameService.currentPosition);
                                }
                                break;

                            case PieceType.Bishop:
                                if (this.gameService.canMoveBishop(index, color, this.selectedPosition, pos)
                                        && this.gameService.isOpponentAt(pos, color)
                                        && this.isColorToMove(color)) {
                                    this.gameService.moveBishop(index, color, this.selectedPosition, pos);
                                    this.gameService.setOppositeColorKingInCheck(color);
                                    this.changeTurns();
                                    this.sendMessage(this.gameService.currentPosition);
                                }
                                break;

                            case PieceType.Pawn:
                                if ((this.selectedPosition.x == pos.x + 1 || this.selectedPosition.x == pos.x - 1)
                                        && this.isColorToMove(color)) {
                                    this.gameService.movePawn(index, color, this.selectedPosition, pos);
                                    this.gameService.setOppositeColorKingInCheck(color);
                                    this.changeTurns();
                                    this.sendMessage(this.gameService.currentPosition);
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
                if (!this.gameService.isCheckmate(color)) {
                    const targetPiece = this.gameService.getPieceInfo(this.selectedPosition);
                    const safePositions = this.gameService.getSafePositions(targetPiece, this.selectedPosition);

                    if (safePositions.length != 0) {
                        if (safePositions.some(vm => vm.x === pos.x && vm.y === pos.y)) {
                            switch(targetPiece.type) {
                                case PieceType.King:
                                    this.gameService.moveKing(index, color, this.selectedPosition, pos);
                                    break;

                                case PieceType.Queen:
                                    this.gameService.moveQueen(index, color, this.selectedPosition, pos);
                                    break;

                                case PieceType.Rook:
                                    this.gameService.moveRook(index, color, this.selectedPosition, pos);
                                    break;

                                case PieceType.Bishop:
                                    this.gameService.moveBishop(index, color, this.selectedPosition, pos);
                                    break;

                                case PieceType.Knight:
                                    this.gameService.moveKnight(index, color, this.selectedPosition, pos);
                                    break;

                                case PieceType.Pawn:
                                    this.gameService.movePawn(index, color, this.selectedPosition, pos);
                                    break;

                                default:
                                    break;
                            }

                            this.gameService.setOppositeColorKingInCheck(color);
                            this.changeTurns();
                            this.sendMessage(this.gameService.currentPosition);
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

    endLocalGame(): void {
      const gameId = Number(localStorage.getItem('currentGameId')) || 0;
      const result = this.isWinForWhite
        ? ResultMessage.WinPlayer1
        : ResultMessage.WinPlayer2;
      this.gameService.endLocalGame(result, gameId).subscribe(data => {
        this.game = data;
        localStorage.removeItem('currentGameId');
        localStorage.removeItem('currentPlayerId');
        localStorage.removeItem('currentPlayerId1');
        localStorage.removeItem('currentPlayerId2');
        localStorage.removeItem('currentPositions');
        localStorage.removeItem('currentGameType');
        localStorage.removeItem('playerTurn');
        this.gameService.webSocketService.disconnect();
      });
    }
}
