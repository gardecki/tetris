import { Injectable } from '@angular/core';
import { TetrominoService } from './tetromino.service';
import { BoardService } from './board.service';
import { CollisionService } from './collision.service';
import { IPoint } from '../interfaces/point';

@Injectable()
export class ControlsService {

  constructor(private ts: TetrominoService, private bs: BoardService, private cs: CollisionService) {
  }

  onKeyPress($event: KeyboardEvent) {
    if ([32, 37, 38, 39, 40].indexOf($event.keyCode) > -1) {
      $event.preventDefault();
    }
    if (this.ts.tetromino) {
      switch ($event.code) {
        case 'ArrowUp' :
          this.moveTetromino({x: 0, y: -1});
          break;
        case 'ArrowDown' :
          this.moveTetromino({x: 0, y: 1});
          break;
        case 'ArrowLeft' :
          this.moveTetromino({x: -1, y: 0});
          break;
        case 'ArrowRight':
          this.moveTetromino({x: 1, y: 0});
          break;
        case 'Space':
          this.rotateTetromino(1);
          break;
      }
    }
  }

  private rotateTetromino(direction: (-1 | 1)) {
    const moveVector = this.cs.rotationMove(direction, this.ts.tetromino, this.bs.cells);
    if (moveVector) {
      this.ts.tetromino.rotate(direction);
      this.ts.tetromino.move(moveVector);
    }
  }

  private moveTetromino(direction: IPoint) {
    if (this.cs.isMovePossible(direction, this.ts.tetromino, this.bs.cells)) {
      this.ts.tetromino.move(direction);
      return true;
    }
    return false;
  }

}
