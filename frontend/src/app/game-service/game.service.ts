import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Coord } from '../chess-board/coord';

@Injectable({
  providedIn: 'root'
})
export class GameService {

      knightPosition$ = new BehaviorSubject<Coord>({ x: 1, y: 0 });
      pawnPosition$ = new BehaviorSubject<Coord>({ x: 0, y: 1 });
      rookPosition$ = new BehaviorSubject<Coord>({ x: 0, y: 0 });
      bishopPosition$ = new BehaviorSubject<Coord>({ x: 2, y: 0 });
      queenPosition$ = new BehaviorSubject<Coord>({ x: 3, y: 0 });
      kingPosition$ = new BehaviorSubject<Coord>({ x: 4, y: 0 });
      currentPosition: { knight: Coord, pawn: Coord , rook: Coord, bishop: Coord, queen: Coord, king: Coord } =
      { knight: { x: 1, y: 0 },
        pawn: { x: 0, y: 1 },
        rook: { x: 0, y: 0 },
        bishop: { x: 2, y: 0 },
        queen: { x: 3, y: 0 },
        king: { x: 4, y: 0 }
      };

      constructor() {
            this.knightPosition$.subscribe(np => {
                this.currentPosition.knight = np;
            })
           this.pawnPosition$.subscribe(pp => {
                this.currentPosition.pawn = pp;
           })
           this.rookPosition$.subscribe(rp => {
                this.currentPosition.rook = rp;
           })
           this.bishopPosition$.subscribe(bp => {
                this.currentPosition.bishop = bp;
           })
           this.queenPosition$.subscribe(qp => {
                this.currentPosition.queen = qp;
           })
           this.kingPosition$.subscribe(kp => {
                this.currentPosition.king = kp;
           })
      }

        isPieceAt(pos: Coord): boolean {
              const { knight, pawn, rook, bishop, queen, king } = this.currentPosition;
              return (knight.x === pos.x && knight.y === pos.y)
                  || (pawn.x === pos.x && pawn.y === pos.y)
                  || (rook.x === pos.x && rook.y === pos.y)
                  || (bishop.x === pos.x && bishop.y === pos.y)
                  || (queen.x === pos.x && queen.y === pos.y)
                  || (king.x === pos.x && king.y === pos.y);
            }

        getPieceType(pos: Coord) {
                const { knight, pawn, rook, bishop, queen, king } = this.currentPosition;
                if (knight.x === pos.x && knight.y === pos.y) {
                  return "knight";
                } else if (pawn.x === pos.x && pawn.y === pos.y) {
                  return "pawn";
                } else if (rook.x === pos.x && rook.y === pos.y) {
                  return "rook";
                } else if (bishop.x === pos.x && bishop.y === pos.y) {
                  return "bishop";
                } else if (queen.x === pos.x && queen.y === pos.y) {
                  return "queen";
                } else if (king.x === pos.x && king.y === pos.y) {
                  return "king";
                } else {
                  return "";
                }
              }


        moveKnight(from: Coord, to: Coord) {
          if (this.canMoveKnight(from, to)) {
            this.knightPosition$.next(to);
          }
        }

        movePawn(from: Coord, to: Coord) {
          if (this.canMovePawn(from, to)) {
            this.pawnPosition$.next(to);
          }
        }

        moveRook(from: Coord, to: Coord) {
                  if (this.canMoveRook(from, to)) {
                    this.rookPosition$.next(to);
                  }
                }

        moveBishop(from: Coord, to: Coord) {
              if (this.canMoveBishop(from, to)) {
                this.bishopPosition$.next(to);
              }
            }

        canMoveKnight(from: Coord, to: Coord) {
          const { x, y } = this.currentPosition.knight;
          const dx = to.x - from.x;
          const dy = to.y - from.y;

          return (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
            (Math.abs(dx) === 1 && Math.abs(dy) === 2);
        }

        canMovePawn(from: Coord, to: Coord) {
          const { x, y } = this.currentPosition.pawn;
          const dx = to.x - from.x;
          const dy = to.y - from.y;

          return (dx === 0 && dy === 1) ||
            (dx === 0 && dy === 2 && y === 1) ||
            (Math.abs(dx) === 1 && dy === 1);
        }

        canMoveRook(from: Coord, to: Coord) {
          const { x: fromX, y: fromY } = from;
          const { x: toX, y: toY } = to;
          const { x: rookX, y: rookY } = this.currentPosition.rook;

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

      canMoveBishop(from: Coord, to: Coord) {
        const { x: fromX, y: fromY } = from;
        const { x: toX, y: toY } = to;
        const { x: bishopX, y: bishopY } = this.currentPosition.bishop;

        // Check if the bishop is moving diagonally
        if (Math.abs(toX - fromX) !== Math.abs(toY - fromY)) {
          return false;
        }

        // Check if there are any pieces in the way
        const dx = Math.sign(toX - fromX);
        const dy = Math.sign(toY - fromY);
        for (let x = fromX + dx, y = fromY + dy; x !== toX || y !== toY; x += dx, y += dy) {
          if (this.isPieceAt({ x, y })) {
            return false;
          }
        }

        return true;
      }

      moveKing(from: Coord, to: Coord) {
        if (this.canMoveKing(from, to)) {
          this.kingPosition$.next(to);
        }
      }

      canMoveKing(from: Coord, to: Coord) {
        const { x: fromX, y: fromY } = from;
        const { x: toX, y: toY } = to;
        if (Math.abs(fromX - toX) <= 1 && Math.abs(fromY - toY) <= 1) {
          const piece = this.isPieceAt(to);
          return !piece;
        }
        return false;
      }

      moveQueen(from: Coord, to: Coord) {
        if (this.canMoveQueen(from, to)) {
          this.queenPosition$.next(to);
        }
      }

      canMoveQueen(from: Coord, to: Coord) {
        if (this.canMoveRook(from, to) || this.canMoveBishop(from, to)) {
          const piece = this.isPieceAt(to);
          return !piece;
        }
        return false;
      }
}
