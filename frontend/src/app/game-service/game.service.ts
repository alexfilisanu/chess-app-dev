import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Coord } from '../chess-board/coord';

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

@Injectable({
    providedIn: 'root'
})
export class GameService {
    rookPosition1W$ = new BehaviorSubject<Coord>({ x: 0, y: 0 });
    knightPosition1W$ = new BehaviorSubject<Coord>({ x: 1, y: 0 });
    bishopPosition1W$ = new BehaviorSubject<Coord>({ x: 2, y: 0 });
    queenPositionW$ = new BehaviorSubject<Coord>({ x: 3, y: 0 });
    kingPositionW$ = new BehaviorSubject<Coord>({ x: 4, y: 0 });
    bishopPosition2W$ = new BehaviorSubject<Coord>({ x: 5, y: 0 });
    knightPosition2W$ = new BehaviorSubject<Coord>({ x: 6, y: 0 });
    rookPosition2W$ = new BehaviorSubject<Coord>({ x: 7, y: 0 });
    pawnPosition1W$ = new BehaviorSubject<Coord>({ x: 0, y: 1 });
    pawnPosition2W$ = new BehaviorSubject<Coord>({ x: 1, y: 1 });
    pawnPosition3W$ = new BehaviorSubject<Coord>({ x: 2, y: 1 });
    pawnPosition4W$ = new BehaviorSubject<Coord>({ x: 3, y: 1 });
    pawnPosition5W$ = new BehaviorSubject<Coord>({ x: 4, y: 1 });
    pawnPosition6W$ = new BehaviorSubject<Coord>({ x: 5, y: 1 });
    pawnPosition7W$ = new BehaviorSubject<Coord>({ x: 6, y: 1 });
    pawnPosition8W$ = new BehaviorSubject<Coord>({ x: 7, y: 1 });

    rookPosition1B$ = new BehaviorSubject<Coord>({ x: 0, y: 7 });
    knightPosition1B$ = new BehaviorSubject<Coord>({ x: 1, y: 7 });
    bishopPosition1B$ = new BehaviorSubject<Coord>({ x: 2, y: 7 });
    queenPositionB$ = new BehaviorSubject<Coord>({ x: 3, y: 7 });
    kingPositionB$ = new BehaviorSubject<Coord>({ x: 4, y: 7 });
    bishopPosition2B$ = new BehaviorSubject<Coord>({ x: 5, y: 7 });
    knightPosition2B$ = new BehaviorSubject<Coord>({ x: 6, y: 7 });
    rookPosition2B$ = new BehaviorSubject<Coord>({ x: 7, y: 7 });
    pawnPosition1B$ = new BehaviorSubject<Coord>({ x: 0, y: 6 });
    pawnPosition2B$ = new BehaviorSubject<Coord>({ x: 1, y: 6 });
    pawnPosition3B$ = new BehaviorSubject<Coord>({ x: 2, y: 6 });
    pawnPosition4B$ = new BehaviorSubject<Coord>({ x: 3, y: 6 });
    pawnPosition5B$ = new BehaviorSubject<Coord>({ x: 4, y: 6 });
    pawnPosition6B$ = new BehaviorSubject<Coord>({ x: 5, y: 6 });
    pawnPosition7B$ = new BehaviorSubject<Coord>({ x: 6, y: 6 });
    pawnPosition8B$ = new BehaviorSubject<Coord>({ x: 7, y: 6 });

    currentPosition: { rook1W: Coord, knight1W: Coord, bishop1W: Coord , queenW: Coord, kingW: Coord,
                       bishop2W: Coord, knight2W: Coord, rook2W: Coord, pawn1W: Coord, pawn2W: Coord,
                       pawn3W: Coord, pawn4W: Coord, pawn5W: Coord, pawn6W: Coord, pawn7W: Coord,
                       pawn8W: Coord, rook1B: Coord, knight1B: Coord, bishop1B: Coord , queenB: Coord,
                       kingB: Coord, bishop2B: Coord, knight2B: Coord, rook2B: Coord,
                       pawn1B: Coord, pawn2B: Coord, pawn3B: Coord, pawn4B: Coord, pawn5B: Coord,
                       pawn6B: Coord, pawn7B: Coord, pawn8B: Coord } =
        {
            rook1W: { x: 0, y: 0 },
            knight1W: { x: 1, y: 0 },
            bishop1W: { x: 2, y: 0 },
            queenW: { x: 3, y: 0 },
            kingW: { x: 4, y: 0 },
            bishop2W: { x: 5, y: 0 },
            knight2W: { x: 6, y: 0 },
            rook2W: { x: 7, y: 0 },
            pawn1W: { x: 0, y: 1 },
            pawn2W: { x: 1, y: 1 },
            pawn3W: { x: 2, y: 1 },
            pawn4W: { x: 3, y: 1 },
            pawn5W: { x: 4, y: 1 },
            pawn6W: { x: 5, y: 1 },
            pawn7W: { x: 6, y: 1 },
            pawn8W: { x: 7, y: 1 },
            rook1B: { x: 0, y: 7 },
            knight1B: { x: 1, y: 7 },
            bishop1B: { x: 2, y: 7 },
            queenB: { x: 3, y: 7 },
            kingB: { x: 4, y: 7 },
            bishop2B: { x: 5, y: 7 },
            knight2B: { x: 6, y: 7 },
            rook2B: { x: 7, y: 7 },
            pawn1B: { x: 0, y: 6 },
            pawn2B: { x: 1, y: 6 },
            pawn3B: { x: 2, y: 6 },
            pawn4B: { x: 3, y: 6 },
            pawn5B: { x: 4, y: 6 },
            pawn6B: { x: 5, y: 6 },
            pawn7B: { x: 6, y: 6 },
            pawn8B: { x: 7, y: 6 }
        };

    constructor() {
        this.knightPosition1W$.subscribe(np => {
            this.currentPosition.knight1W = np;
        })
        this.knightPosition2W$.subscribe(np => {
            this.currentPosition.knight2W = np;
        })
        this.rookPosition1W$.subscribe(rp => {
            this.currentPosition.rook1W = rp;
        })
        this.rookPosition2W$.subscribe(rp => {
            this.currentPosition.rook2W = rp;
        })
        this.bishopPosition1W$.subscribe(bp => {
            this.currentPosition.bishop1W = bp;
        })
        this.bishopPosition2W$.subscribe(bp => {
            this.currentPosition.bishop2W = bp;
        })
        this.queenPositionW$.subscribe(qp => {
            this.currentPosition.queenW = qp;
        })
        this.kingPositionW$.subscribe(kp => {
            this.currentPosition.kingW = kp;
        })
        this.pawnPosition1W$.subscribe(pp => {
            this.currentPosition.pawn1W = pp;
        })
        this.pawnPosition2W$.subscribe(pp => {
            this.currentPosition.pawn2W = pp;
        })
        this.pawnPosition3W$.subscribe(pp => {
            this.currentPosition.pawn3W = pp;
        })
        this.pawnPosition4W$.subscribe(pp => {
            this.currentPosition.pawn4W = pp;
        })
        this.pawnPosition5W$.subscribe(pp => {
            this.currentPosition.pawn5W = pp;
        })
        this.pawnPosition6W$.subscribe(pp => {
            this.currentPosition.pawn6W = pp;
        })
        this.pawnPosition7W$.subscribe(pp => {
            this.currentPosition.pawn7W = pp;
        })
        this.pawnPosition8W$.subscribe(pp => {
            this.currentPosition.pawn8W = pp;
        })
        this.knightPosition1B$.subscribe(np => {
            this.currentPosition.knight1B = np;
        })
        this.knightPosition2B$.subscribe(np => {
            this.currentPosition.knight2B = np;
        })
        this.rookPosition1B$.subscribe(rp => {
            this.currentPosition.rook1B = rp;
        })
        this.rookPosition2B$.subscribe(rp => {
            this.currentPosition.rook2B = rp;
        })
        this.bishopPosition1B$.subscribe(bp => {
            this.currentPosition.bishop1B = bp;
        })
        this.bishopPosition2B$.subscribe(bp => {
            this.currentPosition.bishop2B = bp;
        })
        this.queenPositionB$.subscribe(qp => {
            this.currentPosition.queenB = qp;
        })
        this.kingPositionB$.subscribe(kp => {
            this.currentPosition.kingB = kp;
        })
        this.pawnPosition1B$.subscribe(pp => {
            this.currentPosition.pawn1B = pp;
        })
        this.pawnPosition2B$.subscribe(pp => {
            this.currentPosition.pawn2B = pp;
        })
        this.pawnPosition3B$.subscribe(pp => {
            this.currentPosition.pawn3B = pp;
        })
        this.pawnPosition4B$.subscribe(pp => {
            this.currentPosition.pawn4B = pp;
        })
        this.pawnPosition5B$.subscribe(pp => {
            this.currentPosition.pawn5B = pp;
        })
        this.pawnPosition6B$.subscribe(pp => {
            this.currentPosition.pawn6B = pp;
        })
        this.pawnPosition7B$.subscribe(pp => {
            this.currentPosition.pawn7B = pp;
        })
        this.pawnPosition8B$.subscribe(pp => {
            this.currentPosition.pawn8B = pp;
        })
    }

    isPieceAt(pos: Coord): boolean {
        const pieces = Object.values(this.currentPosition);
        for (const piece of pieces) {
            if (piece.x === pos.x && piece.y === pos.y) {
                return true;
            }
        }

        return false;
    }

    getPieceInfo(pos: Coord): {type: string, index: number, color: string} {
        const pieces = {
            king: [this.currentPosition.kingW, this.currentPosition.kingB],
            queen: [this.currentPosition.queenW, this.currentPosition.queenB],
            rook: [this.currentPosition.rook1W, this.currentPosition.rook2W,
                   this.currentPosition.rook1B, this.currentPosition.rook2B],
            bishop: [this.currentPosition.bishop1W, this.currentPosition.bishop2W,
                     this.currentPosition.bishop1B, this.currentPosition.bishop2B],
            knight: [this.currentPosition.knight1W, this.currentPosition.knight2W,
                     this.currentPosition.knight1B, this.currentPosition.knight2B],
            pawn: [this.currentPosition.pawn1W, this.currentPosition.pawn2W,
                   this.currentPosition.pawn3W, this.currentPosition.pawn4W,
                   this.currentPosition.pawn5W, this.currentPosition.pawn6W,
                   this.currentPosition.pawn7W, this.currentPosition.pawn8W,
                   this.currentPosition.pawn1B, this.currentPosition.pawn2B,
                   this.currentPosition.pawn3B, this.currentPosition.pawn4B,
                   this.currentPosition.pawn5B, this.currentPosition.pawn6B,
                   this.currentPosition.pawn7B, this.currentPosition.pawn8B]
        };

        for (const [type, positions] of Object.entries(pieces)) {
            for (let i = 0; i < positions.length; i++) {
                const {x, y} = positions[i];
                const color = i < positions.length / 2 ? Color.White : Color.Black;
                if (x === pos.x && y === pos.y) {
                    return { type: type, index: i % (positions.length / 2) + 1, color: color};
                }
            }
        }

        return { type: '', index: -1, color: '' };
    }


    getValidMoves(pieceType: { type: string, index: number, color: string }, pos: Coord) {
        const validMoves: Coord[] = [];

        for (let i = 0; i <= 7; i++) {
            for (let j = 0; j <= 7; j++) {
                const toX = i;
                const toY = j;

                if (!(toX === pos.x && toY === pos.y)) {
                    switch (pieceType.type) {
                        case PieceType.King:
                            if (this.canMoveKing(pieceType.index, pieceType.color, pos, { x: toX, y: toY })
                                    && !this.isPieceAt({ x: toX, y: toY })) {
                                validMoves.push({ x: toX, y: toY });
                            }
                            break;

                        case PieceType.Queen:
                            if (this.canMoveQueen(pieceType.index, pieceType.color, pos, { x: toX, y: toY })
                                    && !this.isPieceAt({ x: toX, y: toY })) {
                                validMoves.push({ x: toX, y: toY });
                            }
                            break;

                        case PieceType.Rook:
                            if (this.canMoveRook(pieceType.index, pieceType.color, pos, { x: toX, y: toY })
                                    && !this.isPieceAt({ x: toX, y: toY })) {
                                validMoves.push({ x: toX, y: toY });
                            }
                            break;

                        case PieceType.Bishop:
                            if (this.canMoveBishop(pieceType.index, pieceType.color, pos, { x: toX, y: toY })
                                    && !this.isPieceAt({ x: toX, y: toY })) {
                                validMoves.push({ x: toX, y: toY });
                            }
                            break;

                        case PieceType.Knight:
                            if (this.canMoveKnight(pieceType.index, pieceType.color, pos, { x: toX, y: toY })
                                    && !this.isPieceAt({ x: toX, y: toY })) {
                                validMoves.push({ x: toX, y: toY });
                            }
                            break;

                        case PieceType.Pawn:
                            if (this.canMovePawn(pieceType.index, pieceType.color, pos, { x: toX, y: toY })
                                    && !this.isPieceAt({ x: toX, y: toY })) {
                                validMoves.push({ x: toX, y: toY });
                            }
                            break;

                        default:
                            break;
                    }
                }
            }
        }

        return validMoves;
    }

    moveKing(index: number, color: string, from: Coord, to: Coord) {
        if (this.canMoveKing(index, color, from, to)) {
            (color === Color.White)
                ? this.kingPositionW$.next(to)
                : this.kingPositionB$.next(to);
        }
    }

    moveQueen(index: number, color: string, from: Coord, to: Coord) {
        if (this.canMoveQueen(index, color, from, to)) {
            (color === Color.White)
                ? this.queenPositionW$.next(to)
                : this.queenPositionB$.next(to);
        }
    }

    moveRook(index: number, color: string, from: Coord, to: Coord) {
        if (this.canMoveRook(index, color, from, to)) {
            (color === Color.White)
                ? ((index == 1) ? this.rookPosition1W$.next(to) : this.rookPosition2W$.next(to))
                : ((index == 1) ? this.rookPosition1B$.next(to) : this.rookPosition2B$.next(to));
        }
    }

    moveBishop(index: number, color: string, from: Coord, to: Coord) {
        if (this.canMoveBishop(index, color, from, to)) {
            (color === Color.White)
                ? ((index == 1) ? this.bishopPosition1W$.next(to) : this.bishopPosition2W$.next(to))
                : ((index == 1) ? this.bishopPosition1B$.next(to) : this.bishopPosition2B$.next(to));
        }
    }

    moveKnight(index: number, color: string, from: Coord, to: Coord) {
        if (this.canMoveKnight(index, color, from, to)) {
            (color === Color.White)
                ? ((index == 1) ? this.knightPosition1W$.next(to) : this.knightPosition2W$.next(to))
                : ((index == 1) ? this.knightPosition1B$.next(to) : this.knightPosition2B$.next(to));
        }
    }

    movePawn(index: number, color: string, from: Coord, to: Coord) {
        if (this.canMovePawn(index, color, from, to)) {
            const pawnPosition$ =
                (this as any)[`pawnPosition${index}${color.charAt(0).toUpperCase()}$`];
            pawnPosition$.next(to);
        }
    }

    canMoveKing(index: number, color: string, from: Coord, to: Coord) {
        const { x: fromX, y: fromY } = from;
        const { x: toX, y: toY } = to;

        if (Math.abs(fromX - toX) <= 1 && Math.abs(fromY - toY) <= 1) {
            const piece = this.isPieceAt(to);
            return !piece;
        }

        return false;
    }

    canMoveQueen(index: number, color: string, from: Coord, to: Coord) {
        if (this.canMoveRook(index, color, from, to)
                || this.canMoveBishop(index, color, from, to)) {
            const piece = this.isPieceAt(to);
            return !piece;
        }

        return false;
    }

    canMoveRook(index: number, color: string, from: Coord, to: Coord) {
        const { x: fromX, y: fromY } = from;
        const { x: toX, y: toY } = to;

        if (fromX !== toX && fromY !== toY) {
            return false;
        }

        const dx = Math.sign(toX - fromX);
        const dy = Math.sign(toY - fromY);
        for (let x = fromX + dx, y = fromY + dy; x !== toX || y !== toY; x += dx, y += dy) {
            if (this.isPieceAt({ x, y })) {
                return false;
            }
        }

        return true;
    }

    canMoveBishop(index: number, color: string, from: Coord, to: Coord) {
        const { x: fromX, y: fromY } = from;
        const { x: toX, y: toY } = to;

        if (Math.abs(toX - fromX) !== Math.abs(toY - fromY)) {
            return false;
        }

        const dx = Math.sign(toX - fromX);
        const dy = Math.sign(toY - fromY);
        for (let x = fromX + dx, y = fromY + dy; x !== toX || y !== toY; x += dx, y += dy) {
            if (this.isPieceAt({ x, y })) {
                return false;
            }
        }

        return true;
    }

    canMoveKnight(index: number, color: string, from: Coord, to: Coord) {
        const dx = to.x - from.x;
        const dy = to.y - from.y;

        return (Math.abs(dx) === 2 && Math.abs(dy) === 1)
            || (Math.abs(dx) === 1 && Math.abs(dy) === 2);
    }

    canMovePawn(index: number, color: string, from: Coord, to: Coord) {
        const piece = `pawn${index}${color.charAt(0).toUpperCase()}` as keyof typeof this.currentPosition;
        const { x, y } = this.currentPosition[piece];
        const dx = to.x - from.x;
        const dy = to.y - from.y;

        return (color === Color.White)
            ? (dx === 0 && dy === 1)
                || (dx === 0 && dy === 2 && y === 1 && from.y === 1 && to.y === 3)
            : (dx === 0 && dy === -1)
                || (dx === 0 && dy === -2 && y === 6 && from.y === 6 && to.y === 4);
    }
}
