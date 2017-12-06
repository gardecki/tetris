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
    //$event.preventDefault();
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
      }
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
