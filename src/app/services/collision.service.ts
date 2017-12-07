import { Injectable } from '@angular/core';
import { IPoint } from '../interfaces/point';
import { Tetromino } from '../classes/tetromino';
import { IGrid } from '../interfaces/grid';

@Injectable()
export class CollisionService {

  isMovePossible(direction: IPoint, tetromino: Tetromino, board: IGrid, tetrominoGrid: IGrid = null): boolean {
    const [cols, rows] = [board[0].length, board.length];
    const [col, row] = [tetromino.x + direction.x, tetromino.y + direction.y];
    const targetGrid = tetrominoGrid || tetromino.cells;
    for (let y = 0; y < targetGrid.length; y++) {
      for (let x = 0; x < targetGrid.length; x++) {
        if (targetGrid[y][x] && (col + x < 0 || col + x >= cols || row + y >= rows || (row + y >= 0 && board[row + y][col + x]))) {
          return false;
        }
      }
    }
    return true;
  }

  rotationMove(direction: (-1 | 1), tetromino: Tetromino, board: IGrid): (IPoint | false) {
    if (tetromino.wallKicks) {
      const wallKickIndex = direction === -1 ? tetromino.targetRotation(direction) : tetromino.rotation;
      const targetGrid = tetromino.targetRotationGrid(direction);
      const result = tetromino.wallKicks[wallKickIndex]
        .find(wc => this.isMovePossible(direction === -1 ? this.invertVector(wc) : wc, tetromino, board, targetGrid));
      return result ? (direction === -1 ? this.invertVector(result) : result) : false;
    }
    return {x: 0, y: 0};
  }

  private invertVector(v: IPoint): IPoint {
    return { x: -v.x, y: -v.y };
  }
}
