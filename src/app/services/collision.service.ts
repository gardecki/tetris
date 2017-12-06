import { Injectable } from '@angular/core';
import { IPoint } from '../interfaces/point';
import { Tetromino } from '../classes/tetromino';
import { IGrid } from '../interfaces/grid';

@Injectable()
export class CollisionService {

  isMovePossible(direction: IPoint, tetromino: Tetromino, board: IGrid) {
    const [cols, rows] = [board[0].length, board.length];
    const [col, row] = [tetromino.x + direction.x, tetromino.y + direction.y];
    for (let y = 0; y < tetromino.cells.length; y++) {
      for (let x = 0; x < tetromino.cells.length; x++) {
        if (tetromino.cells[y][x] && (col + x < 0 || col + x >= cols || row + y >= rows || (row + y >= 0 && board[row + y][col + x]))) {
          return false;
        }
      }
    }
    return true;
  }
}
