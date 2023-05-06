import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Coord } from '../chess-board/coord';

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

      currentPosition: { rook1W: Coord, knight1W: Coord, bishop1W: Coord , queenW: Coord, kingW: Coord, bishop2W: Coord, knight2W: Coord, rook2W: Coord,
                         pawn1W: Coord, pawn2W: Coord, pawn3W: Coord, pawn4W: Coord, pawn5W: Coord, pawn6W: Coord, pawn7W: Coord, pawn8W: Coord,
                         rook1B: Coord, knight1B: Coord, bishop1B: Coord , queenB: Coord, kingB: Coord, bishop2B: Coord, knight2B: Coord, rook2B: Coord,
                         pawn1B: Coord, pawn2B: Coord, pawn3B: Coord, pawn4B: Coord, pawn5B: Coord, pawn6B: Coord, pawn7B: Coord, pawn8B: Coord} =
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
              const  { rook1W, knight1W, bishop1W , queenW, kingW, bishop2W, knight2W, rook2W,
                       pawn1W, pawn2W, pawn3W, pawn4W, pawn5W, pawn6W, pawn7W, pawn8W,
                       rook1B, knight1B, bishop1B , queenB, kingB, bishop2B, knight2B, rook2B,
                       pawn1B, pawn2B, pawn3B, pawn4B, pawn5B, pawn6B, pawn7B, pawn8B } = this.currentPosition;
              return (knight1W.x === pos.x && knight1W.y === pos.y)
                  || (knight2W.x === pos.x && knight2W.y === pos.y)
                  || (pawn1W.x === pos.x && pawn1W.y === pos.y)
                  || (pawn2W.x === pos.x && pawn2W.y === pos.y)
                  || (pawn3W.x === pos.x && pawn3W.y === pos.y)
                  || (pawn4W.x === pos.x && pawn4W.y === pos.y)
                  || (pawn5W.x === pos.x && pawn5W.y === pos.y)
                  || (pawn6W.x === pos.x && pawn6W.y === pos.y)
                  || (pawn7W.x === pos.x && pawn7W.y === pos.y)
                  || (pawn8W.x === pos.x && pawn8W.y === pos.y)
                  || (rook1W.x === pos.x && rook1W.y === pos.y)
                  || (rook2W.x === pos.x && rook2W.y === pos.y)
                  || (bishop1W.x === pos.x && bishop1W.y === pos.y)
                  || (bishop2W.x === pos.x && bishop2W.y === pos.y)
                  || (queenW.x === pos.x && queenW.y === pos.y)
                  || (kingW.x === pos.x && kingW.y === pos.y)
                  || (knight1B.x === pos.x && knight1B.y === pos.y)
                  || (knight2B.x === pos.x && knight2B.y === pos.y)
                  || (pawn1B.x === pos.x && pawn1B.y === pos.y)
                  || (pawn2B.x === pos.x && pawn2B.y === pos.y)
                  || (pawn3B.x === pos.x && pawn3B.y === pos.y)
                  || (pawn4B.x === pos.x && pawn4B.y === pos.y)
                  || (pawn5B.x === pos.x && pawn5B.y === pos.y)
                  || (pawn6B.x === pos.x && pawn6B.y === pos.y)
                  || (pawn7B.x === pos.x && pawn7B.y === pos.y)
                  || (pawn8B.x === pos.x && pawn8B.y === pos.y)
                  || (rook1B.x === pos.x && rook1B.y === pos.y)
                  || (rook2B.x === pos.x && rook2B.y === pos.y)
                  || (bishop1B.x === pos.x && bishop1B.y === pos.y)
                  || (bishop2B.x === pos.x && bishop2B.y === pos.y)
                  || (queenB.x === pos.x && queenB.y === pos.y)
                  || (kingB.x === pos.x && kingB.y === pos.y);
            }

        getPieceType(pos: Coord): {piece: string, index: number, color: string} {
                const  { rook1W, knight1W, bishop1W , queenW, kingW, bishop2W, knight2W, rook2W,
                         pawn1W, pawn2W, pawn3W, pawn4W, pawn5W, pawn6W, pawn7W, pawn8W,
                         rook1B, knight1B, bishop1B , queenB, kingB, bishop2B, knight2B, rook2B,
                         pawn1B, pawn2B, pawn3B, pawn4B, pawn5B, pawn6B, pawn7B, pawn8B } = this.currentPosition;
                if (knight1W.x === pos.x && knight1W.y === pos.y) {
                    return { piece: "knight", index: 1, color: "white"};
                } else if (knight2W.x === pos.x && knight2W.y === pos.y) {
                    return { piece: "knight", index: 2, color: "white"};
                } else if (rook1W.x === pos.x && rook1W.y === pos.y) {
                    return { piece: "rook", index: 1, color: "white"};
                } else if (rook2W.x === pos.x && rook2W.y === pos.y) {
                    return { piece: "rook", index: 2, color: "white"};
                } else if (bishop1W.x === pos.x && bishop1W.y === pos.y) {
                    return { piece: "bishop", index: 1, color: "white"};
                } else if (bishop2W.x === pos.x && bishop2W.y === pos.y) {
                    return { piece: "bishop", index: 2, color: "white"};
                } else if (queenW.x === pos.x && queenW.y === pos.y) {
                    return { piece: "queen", index: 1, color: "white"};
                } else if (kingW.x === pos.x && kingW.y === pos.y) {
                    return { piece: "king", index: 1, color: "white"};
                } else if (pawn1W.x === pos.x && pawn1W.y === pos.y) {
                    return { piece: "pawn", index: 1, color: "white"};
                } else if (pawn2W.x === pos.x && pawn2W.y === pos.y) {
                    return { piece: "pawn", index: 2, color: "white"};
                } else if (pawn3W.x === pos.x && pawn3W.y === pos.y) {
                    return { piece: "pawn", index: 3, color: "white"};
                } else if (pawn4W.x === pos.x && pawn4W.y === pos.y) {
                    return { piece: "pawn", index: 4, color: "white"};
                } else if (pawn5W.x === pos.x && pawn5W.y === pos.y) {
                    return { piece: "pawn", index: 5, color: "white"};
                } else if (pawn6W.x === pos.x && pawn6W.y === pos.y) {
                    return { piece: "pawn", index: 6, color: "white"};
                } else if (pawn7W.x === pos.x && pawn7W.y === pos.y) {
                    return { piece: "pawn", index: 7, color: "white"};
                } else if (pawn8W.x === pos.x && pawn8W.y === pos.y) {
                    return { piece: "pawn", index: 8, color: "white"};
                } else if (knight1B.x === pos.x && knight1B.y === pos.y) {
                    return { piece: "knight", index: 1, color: "black"};
                } else if (knight2B.x === pos.x && knight2B.y === pos.y) {
                    return { piece: "knight", index: 2, color: "black"};
                } else if (rook1B.x === pos.x && rook1B.y === pos.y) {
                    return { piece: "rook", index: 1, color: "black"};
                } else if (rook2B.x === pos.x && rook2B.y === pos.y) {
                    return { piece: "rook", index: 2, color: "black"};
                } else if (bishop1B.x === pos.x && bishop1B.y === pos.y) {
                    return { piece: "bishop", index: 1, color: "black"};
                } else if (bishop2B.x === pos.x && bishop2B.y === pos.y) {
                    return { piece: "bishop", index: 2, color: "black"};
                } else if (queenB.x === pos.x && queenB.y === pos.y) {
                    return { piece: "queen", index: 1, color: "black"};
                } else if (kingB.x === pos.x && kingB.y === pos.y) {
                    return { piece: "king", index: 1, color: "black"};
                } else if (pawn1B.x === pos.x && pawn1B.y === pos.y) {
                    return { piece: "pawn", index: 1, color: "black"};
                } else if (pawn2B.x === pos.x && pawn2B.y === pos.y) {
                    return { piece: "pawn", index: 2, color: "black"};
                } else if (pawn3B.x === pos.x && pawn3B.y === pos.y) {
                    return { piece: "pawn", index: 3, color: "black"};
                } else if (pawn4B.x === pos.x && pawn4B.y === pos.y) {
                    return { piece: "pawn", index: 4, color: "black"};
                } else if (pawn5B.x === pos.x && pawn5B.y === pos.y) {
                    return { piece: "pawn", index: 5, color: "black"};
                } else if (pawn6B.x === pos.x && pawn6B.y === pos.y) {
                    return { piece: "pawn", index: 6, color: "black"};
                } else if (pawn7B.x === pos.x && pawn7B.y === pos.y) {
                    return { piece: "pawn", index: 7, color: "black"};
                } else if (pawn8B.x === pos.x && pawn8B.y === pos.y) {
                    return { piece: "pawn", index: 8, color: "black"};
                } else {
                    return { piece: "", index: -1, color: ""};
                }
              }

        getValidMoves(pieceType: {piece: string, index: number, color: string}, pos: Coord) {
          const validMoves: Coord[] = [];

          if (pieceType.piece === "knight") {
            for (let i = 0; i <= 7; i++) {
              for(let j = 0; j <= 7; j++) {
                const toX = i;
                const toY = j;
                if (!(toX == pos.x && toY == pos.y)) {
                  if (this.canMoveKnight(pieceType.index, pieceType.color, pos, { x: toX, y: toY }) && !this.isPieceAt({ x: toX, y: toY })) {
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
                  if (this.canMovePawn(pieceType.index, pieceType.color, pos, { x: toX, y: toY }) && !this.isPieceAt({ x: toX, y: toY })) {
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
                  if (this.canMoveRook(pieceType.index, pieceType.color, pos, { x: toX, y: toY }) && !this.isPieceAt({ x: toX, y: toY })) {
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
                  if (this.canMoveBishop(pieceType.index, pieceType.color, pos, { x: toX, y: toY }) && !this.isPieceAt({ x: toX, y: toY })) {
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
                  if (this.canMoveQueen(pieceType.index, pieceType.color, pos, { x: toX, y: toY }) && !this.isPieceAt({ x: toX, y: toY })) {
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
                  if (this.canMoveKing(pieceType.index, pieceType.color, pos, { x: toX, y: toY }) && !this.isPieceAt({ x: toX, y: toY })) {
                    validMoves.push({ x: toX, y: toY });
                  }
                }
              }
            }
          }

          return validMoves;
        }



        moveKnight(index: number, color: string, from: Coord, to: Coord) {
          if (this.canMoveKnight(index, color, from, to)) {
          (color === 'white') ? (
                (index == 1) ? this.knightPosition1W$.next(to) : this.knightPosition2W$.next(to)
            ) : (
                (index == 1) ? this.knightPosition1B$.next(to) : this.knightPosition2B$.next(to)
            );
          }
        }

        movePawn(index: number, color: string, from: Coord, to: Coord) {
          if (this.canMovePawn(index, color, from, to)) {
          if (color === 'white') {
            switch (index) {
              case 1:
                this.pawnPosition1W$.next(to);
                break;
              case 2:
                this.pawnPosition2W$.next(to);
                break;
              case 3:
                this.pawnPosition3W$.next(to);
                break;
              case 4:
                this.pawnPosition4W$.next(to);
                break;
              case 5:
                this.pawnPosition5W$.next(to);
                break;
              case 6:
                this.pawnPosition6W$.next(to);
                break;
              case 7:
                this.pawnPosition7W$.next(to);
                break;
              case 8:
                this.pawnPosition8W$.next(to);
                break;
              default:
                break;
            }} else {
          switch (index) {
                      case 1:
                        this.pawnPosition1B$.next(to);
                        break;
                      case 2:
                        this.pawnPosition2B$.next(to);
                        break;
                      case 3:
                        this.pawnPosition3B$.next(to);
                        break;
                      case 4:
                        this.pawnPosition4B$.next(to);
                        break;
                      case 5:
                        this.pawnPosition5B$.next(to);
                        break;
                      case 6:
                        this.pawnPosition6B$.next(to);
                        break;
                      case 7:
                        this.pawnPosition7B$.next(to);
                        break;
                      case 8:
                        this.pawnPosition8B$.next(to);
                        break;
                      default:
                        break;
            }
            }
         }
        }

        moveRook(index: number, color: string, from: Coord, to: Coord) {
          if (this.canMoveRook(index, color, from, to)) {
          (color == 'white') ? (
            (index == 1) ? this.rookPosition1W$.next(to) : this.rookPosition2W$.next(to)) :
            ((index == 1) ? this.rookPosition1B$.next(to) : this.rookPosition2B$.next(to));
          }
        }

        moveBishop(index: number, color: string, from: Coord, to: Coord) {
          if (this.canMoveBishop(index, color, from, to)) {
          (color == 'white') ? (
            (index == 1) ? this.bishopPosition1W$.next(to) : this.bishopPosition2W$.next(to)) :
            ((index == 1) ? this.bishopPosition1B$.next(to) : this.bishopPosition2B$.next(to));
          }
        }

        moveQueen(index: number, color: string, from: Coord, to: Coord) {
          if (this.canMoveQueen(index, color, from, to)) {
            (color == 'white') ? this.queenPositionW$.next(to) : this.queenPositionB$.next(to);
          }
        }

        moveKing(index: number, color: string, from: Coord, to: Coord) {
          if (this.canMoveKing(index, color, from, to)) {
            (color == 'white') ? this.kingPositionW$.next(to) : this.kingPositionB$.next(to);
          }
        }


        canMoveKnight(index: number, color: string, from: Coord, to: Coord) {
          const dx = to.x - from.x;
          const dy = to.y - from.y;

          return (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
            (Math.abs(dx) === 1 && Math.abs(dy) === 2);
        }

        canMovePawn(index: number, color: string, from: Coord, to: Coord) {
        if (color == 'white') {
          const piece = `pawn${index}W` as keyof typeof this.currentPosition;
          const { x, y } = this.currentPosition[piece];
          const dx = to.x - from.x;
          const dy = to.y - from.y;

          return (dx === 0 && dy === 1) || (dx === 0 && dy === 2 && y === 1 && from.y === 1 && to.y === 3) ;
            }
          const piece = `pawn${index}B` as keyof typeof this.currentPosition;
                    const { x, y } = this.currentPosition[piece];
                    const dx = - to.x + from.x;
                    const dy = - to.y + from.y;

                    return (dx === 0 && dy === 1) || (dx === 0 && dy === 2 && y === 6 && from.y === 1 && to.y === 3) ;
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
        if (this.canMoveRook(index, color, from, to) || this.canMoveBishop(index, color, from, to)) {
          const piece = this.isPieceAt(to);
          return !piece;
        }
        return false;
      }
}
