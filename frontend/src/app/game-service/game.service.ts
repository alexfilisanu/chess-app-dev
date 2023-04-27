import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Coord } from '../chess-board/coord';

@Injectable({
  providedIn: 'root'
})
export class GameService {

      rookPosition1$ = new BehaviorSubject<Coord>({ x: 0, y: 0 });
      knightPosition1$ = new BehaviorSubject<Coord>({ x: 1, y: 0 });
      bishopPosition1$ = new BehaviorSubject<Coord>({ x: 2, y: 0 });
      queenPosition$ = new BehaviorSubject<Coord>({ x: 3, y: 0 });
      kingPosition$ = new BehaviorSubject<Coord>({ x: 4, y: 0 });
      bishopPosition2$ = new BehaviorSubject<Coord>({ x: 5, y: 0 });
      knightPosition2$ = new BehaviorSubject<Coord>({ x: 6, y: 0 });
      rookPosition2$ = new BehaviorSubject<Coord>({ x: 7, y: 0 });
      pawnPosition1$ = new BehaviorSubject<Coord>({ x: 0, y: 1 });
      pawnPosition2$ = new BehaviorSubject<Coord>({ x: 1, y: 1 });
      pawnPosition3$ = new BehaviorSubject<Coord>({ x: 2, y: 1 });
      pawnPosition4$ = new BehaviorSubject<Coord>({ x: 3, y: 1 });
      pawnPosition5$ = new BehaviorSubject<Coord>({ x: 4, y: 1 });
      pawnPosition6$ = new BehaviorSubject<Coord>({ x: 5, y: 1 });
      pawnPosition7$ = new BehaviorSubject<Coord>({ x: 6, y: 1 });
      pawnPosition8$ = new BehaviorSubject<Coord>({ x: 7, y: 1 });

      currentPosition: { rook1: Coord, knight1: Coord, bishop1: Coord , queen: Coord, king: Coord, bishop2: Coord, knight2: Coord, rook2: Coord,
                         pawn1: Coord, pawn2: Coord, pawn3: Coord, pawn4: Coord, pawn5: Coord, pawn6: Coord, pawn7: Coord, pawn8: Coord } =
      {
        rook1: { x: 0, y: 0 },
        knight1: { x: 1, y: 0 },
        bishop1: { x: 2, y: 0 },
        queen: { x: 3, y: 0 },
        king: { x: 4, y: 0 },
        bishop2: { x: 5, y: 0 },
        knight2: { x: 6, y: 0 },
        rook2: { x: 7, y: 0 },
        pawn1: { x: 0, y: 1 },
        pawn2: { x: 1, y: 1 },
        pawn3: { x: 2, y: 1 },
        pawn4: { x: 3, y: 1 },
        pawn5: { x: 4, y: 1 },
        pawn6: { x: 5, y: 1 },
        pawn7: { x: 6, y: 1 },
        pawn8: { x: 7, y: 1 }
      };

      constructor() {
           this.knightPosition1$.subscribe(np => {
                this.currentPosition.knight1 = np;
           })
           this.knightPosition2$.subscribe(np => {
                this.currentPosition.knight2 = np;
           })
           this.rookPosition1$.subscribe(rp => {
                this.currentPosition.rook1 = rp;
           })
           this.rookPosition2$.subscribe(rp => {
                this.currentPosition.rook2 = rp;
           })
           this.bishopPosition1$.subscribe(bp => {
                this.currentPosition.bishop1 = bp;
           })
           this.bishopPosition2$.subscribe(bp => {
                this.currentPosition.bishop2 = bp;
           })
           this.queenPosition$.subscribe(qp => {
                this.currentPosition.queen = qp;
           })
           this.kingPosition$.subscribe(kp => {
                this.currentPosition.king = kp;
           })
           this.pawnPosition1$.subscribe(pp => {
                this.currentPosition.pawn1 = pp;
           })
           this.pawnPosition2$.subscribe(pp => {
                this.currentPosition.pawn2 = pp;
           })
           this.pawnPosition3$.subscribe(pp => {
                this.currentPosition.pawn3 = pp;
           })
           this.pawnPosition4$.subscribe(pp => {
                this.currentPosition.pawn4 = pp;
           })
           this.pawnPosition5$.subscribe(pp => {
                this.currentPosition.pawn5 = pp;
           })
           this.pawnPosition6$.subscribe(pp => {
                this.currentPosition.pawn6 = pp;
           })
           this.pawnPosition7$.subscribe(pp => {
                this.currentPosition.pawn7 = pp;
           })
           this.pawnPosition8$.subscribe(pp => {
                this.currentPosition.pawn8 = pp;
           })
      }

        isPieceAt(pos: Coord): boolean {
              const  { rook1, knight1, bishop1 , queen, king, bishop2, knight2, rook2,
                       pawn1, pawn2, pawn3, pawn4, pawn5, pawn6, pawn7, pawn8} = this.currentPosition;
              return (knight1.x === pos.x && knight1.y === pos.y)
                  || (knight2.x === pos.x && knight2.y === pos.y)
                  || (pawn1.x === pos.x && pawn1.y === pos.y)
                  || (pawn2.x === pos.x && pawn2.y === pos.y)
                  || (pawn3.x === pos.x && pawn3.y === pos.y)
                  || (pawn4.x === pos.x && pawn4.y === pos.y)
                  || (pawn5.x === pos.x && pawn5.y === pos.y)
                  || (pawn6.x === pos.x && pawn6.y === pos.y)
                  || (pawn7.x === pos.x && pawn7.y === pos.y)
                  || (pawn8.x === pos.x && pawn8.y === pos.y)
                  || (rook1.x === pos.x && rook1.y === pos.y)
                  || (rook2.x === pos.x && rook2.y === pos.y)
                  || (bishop1.x === pos.x && bishop1.y === pos.y)
                  || (bishop2.x === pos.x && bishop2.y === pos.y)
                  || (queen.x === pos.x && queen.y === pos.y)
                  || (king.x === pos.x && king.y === pos.y);
            }

        getPieceType(pos: Coord): {piece: string, index: number} {
                const { rook1, knight1, bishop1 , queen, king, bishop2, knight2, rook2,
                        pawn1, pawn2, pawn3, pawn4, pawn5, pawn6, pawn7, pawn8} = this.currentPosition;
                if (knight1.x === pos.x && knight1.y === pos.y) {
                  return { piece: "knight", index: 1};
                } else if (knight2.x === pos.x && knight2.y === pos.y) {
                  return { piece: "knight", index: 2};
                } else if (rook1.x === pos.x && rook1.y === pos.y) {
                  return { piece: "rook", index: 1};
                } else if (rook2.x === pos.x && rook2.y === pos.y) {
                  return { piece: "rook", index: 2};
                } else if (bishop1.x === pos.x && bishop1.y === pos.y) {
                  return { piece: "bishop", index: 1};
                } else if (bishop2.x === pos.x && bishop2.y === pos.y) {
                  return { piece: "bishop", index: 2};
                } else if (queen.x === pos.x && queen.y === pos.y) {
                  return { piece: "queen", index: 1};
                } else if (king.x === pos.x && king.y === pos.y) {
                  return { piece: "king", index: 1};
                } else if (pawn1.x === pos.x && pawn1.y === pos.y) {
                  return { piece: "pawn", index: 1};
                } else if (pawn2.x === pos.x && pawn2.y === pos.y) {
                  return { piece: "pawn", index: 2};
                } else if (pawn3.x === pos.x && pawn3.y === pos.y) {
                  return { piece: "pawn", index: 3};
                } else if (pawn4.x === pos.x && pawn4.y === pos.y) {
                  return { piece: "pawn", index: 4};
                } else if (pawn5.x === pos.x && pawn5.y === pos.y) {
                  return { piece: "pawn", index: 5};
                } else if (pawn6.x === pos.x && pawn6.y === pos.y) {
                  return { piece: "pawn", index: 6};
                } else if (pawn7.x === pos.x && pawn7.y === pos.y) {
                  return { piece: "pawn", index: 7};
                } else if (pawn8.x === pos.x && pawn8.y === pos.y) {
                  return { piece: "pawn", index: 8};
                } else {
                  return { piece: "", index: -1};
                }
              }

        getValidMoves(pieceType: {piece: string, index: number}, pos: Coord) {
          const validMoves: Coord[] = [];

          if (pieceType.piece === "knight") {
            for (let i = 0; i <= 7; i++) {
              for(let j = 0; j <= 7; j++) {
                const toX = i;
                const toY = j;
                if (!(toX == pos.x && toY == pos.y)) {
                  if (this.canMoveKnight(pieceType.index, pos, { x: toX, y: toY }) && !this.isPieceAt({ x: toX, y: toY })) {
                    validMoves.push({ x: toX, y: toY });
                  }
                }
              }
            }
          } else if (pieceType.piece === "pawn") {
            for (let i = 0; i <= 7; i++) {
              for(let j = 0; j <= 7; j++) {
                const toX = i;
                const toY = j;
                if (!(toX == pos.x && toY == pos.y)) {
                  if (this.canMovePawn(pieceType.index, pos, { x: toX, y: toY }) && !this.isPieceAt({ x: toX, y: toY })) {
                    validMoves.push({ x: toX, y: toY });
                  }
                }
              }
            }
          } else if (pieceType.piece === "rook") {
            for (let i = 0; i <= 7; i++) {
              for(let j = 0; j <= 7; j++) {
                const toX = i;
                const toY = j;
                if (!(toX == pos.x && toY == pos.y)) {
                  if (this.canMoveRook(pieceType.index, pos, { x: toX, y: toY }) && !this.isPieceAt({ x: toX, y: toY })) {
                    validMoves.push({ x: toX, y: toY });
                  }
                }
              }
            }
          } else if (pieceType.piece === "bishop") {
            for (let i = 0; i <= 7; i++) {
              for(let j = 0; j <= 7; j++) {
                const toX = i;
                const toY = j;
                if (!(toX == pos.x && toY == pos.y)) {
                  if (this.canMoveBishop(pieceType.index, pos, { x: toX, y: toY }) && !this.isPieceAt({ x: toX, y: toY })) {
                    validMoves.push({ x: toX, y: toY });
                  }
                }
              }
            }
          } else if (pieceType.piece === "queen") {
            for (let i = 0; i <= 7; i++) {
              for(let j = 0; j <= 7; j++) {
                const toX = i;
                const toY = j;
                if (!(toX == pos.x && toY == pos.y)) {
                  if (this.canMoveQueen(pieceType.index, pos, { x: toX, y: toY }) && !this.isPieceAt({ x: toX, y: toY })) {
                    validMoves.push({ x: toX, y: toY });
                  }
                }
              }
            }
          } else if (pieceType.piece === "king") {
            for (let i = 0; i <= 7; i++) {
              for(let j = 0; j <= 7; j++) {
                const toX = i;
                const toY = j;
                if (!(toX == pos.x && toY == pos.y)) {
                  if (this.canMoveKing(pieceType.index, pos, { x: toX, y: toY }) && !this.isPieceAt({ x: toX, y: toY })) {
                    validMoves.push({ x: toX, y: toY });
                  }
                }
              }
            }
          }

          return validMoves;
        }



        moveKnight(index: number, from: Coord, to: Coord) {
          if (this.canMoveKnight(index, from, to)) {
            (index == 1) ? this.knightPosition1$.next(to) : this.knightPosition2$.next(to);
          }
        }

        movePawn(index: number, from: Coord, to: Coord) {
          if (this.canMovePawn(index, from, to)) {
            switch (index) {
              case 1:
                this.pawnPosition1$.next(to);
                break;
              case 2:
                this.pawnPosition2$.next(to);
                break;
              case 3:
                this.pawnPosition3$.next(to);
                break;
              case 4:
                this.pawnPosition4$.next(to);
                break;
              case 5:
                this.pawnPosition5$.next(to);
                break;
              case 6:
                this.pawnPosition6$.next(to);
                break;
              case 7:
                this.pawnPosition7$.next(to);
                break;
              case 8:
                this.pawnPosition8$.next(to);
                break;
              default:
                break;
            }
          }
        }

        moveRook(index: number, from: Coord, to: Coord) {
          if (this.canMoveRook(index, from, to)) {
            (index == 1) ? this.rookPosition1$.next(to) : this.rookPosition2$.next(to);
          }
        }

        moveBishop(index: number, from: Coord, to: Coord) {
          if (this.canMoveBishop(index, from, to)) {
            (index == 1) ? this.bishopPosition1$.next(to) : this.bishopPosition2$.next(to);
          }
        }

        moveQueen(index: number, from: Coord, to: Coord) {
          if (this.canMoveQueen(index, from, to)) {
            (index == 1) ? this.queenPosition$.next(to) : this.queenPosition$.next(to);
          }
        }

        moveKing(index: number, from: Coord, to: Coord) {
          if (this.canMoveKing(index, from, to)) {
            (index == 1) ? this.kingPosition$.next(to) : this.kingPosition$.next(to);
          }
        }


        canMoveKnight(index: number, from: Coord, to: Coord) {
          const dx = to.x - from.x;
          const dy = to.y - from.y;

          return (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
            (Math.abs(dx) === 1 && Math.abs(dy) === 2);
        }

        canMovePawn(index: number, from: Coord, to: Coord) {
          const piece = `pawn${index}` as keyof typeof this.currentPosition;
          const { x, y } = this.currentPosition[piece];
          const dx = to.x - from.x;
          const dy = to.y - from.y;

          return (dx === 0 && dy === 1) || (dx === 0 && dy === 2 && y === 1 && from.y === 1 && to.y === 3) ;
        }


        canMoveRook(index: number, from: Coord, to: Coord) {
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

      canMoveBishop(index: number, from: Coord, to: Coord) {
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

      canMoveKing(index: number, from: Coord, to: Coord) {
        const { x: fromX, y: fromY } = from;
        const { x: toX, y: toY } = to;
        if (Math.abs(fromX - toX) <= 1 && Math.abs(fromY - toY) <= 1) {
          const piece = this.isPieceAt(to);
          return !piece;
        }
        return false;
      }


      canMoveQueen(index: number, from: Coord, to: Coord) {
        if (this.canMoveRook(index, from, to) || this.canMoveBishop(index, from, to)) {
          const piece = this.isPieceAt(to);
          return !piece;
        }
        return false;
      }
}
