import { Injectable } from '@angular/core';
import { IPoint } from '../interfaces/point';
import { TetrominoBagService } from './tetromino-bag.service';
import { Tetromino } from '../classes/tetromino';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Cell } from '../interfaces/cell';

const LOSTJ_WALL_KICKS: IPoint[][] = [
  [{x: 0, y: 0}, {x: -1, y: 0}, {x: -1, y: -1}, {x: 0, y: 2}, {x: -1, y: 2}],
  [{x: 0, y: 0}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 0, y: -2}, {x: 1, y: -2}],
  [{x: 0, y: 0}, {x: 1, y: 0}, {x: 1, y: -1}, {x: 0, y: 2}, {x: 1, y: 2}],
  [{x: 0, y: 0}, {x: -1, y: 0}, {x: -1, y: 1}, {x: 0, y: -2}, {x: -1, y: -2}]
];

const I_WALL_KICKS: IPoint[][] = [
  [{x: 0, y: 0}, {x: -2, y: 0}, {x: 1, y: 0}, {x: -2, y: -1}, {x: 1, y: -2}],
  [{x: 0, y: 0}, {x: -1, y: 0}, {x: 2, y: 0}, {x: -1, y: 2}, {x: 2, y: 1}],
  [{x: 0, y: 0}, {x: 2, y: 0}, {x: -1, y: 0}, {x: 2, y: 1}, {x: -1, y: 2}],
  [{x: 0, y: 0}, {x: 1, y: 0}, {x: -2, y: 0}, {x: 1, y: -2}, {x: -2, y: -1}]
];

const TETROMINO_DATA = {
  L: {
    grid: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0]
    ],
    wallKicks: LOSTJ_WALL_KICKS
  },
  I: {
    grid: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    wallKicks: I_WALL_KICKS
  },
  J: {
    grid: [
      [1, 1],
      [1, 1]
    ]
  },
  S: {
    grid: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0]
    ],
    wallKicks: LOSTJ_WALL_KICKS
  },
  T: {
    grid: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0]
    ],
    wallKicks: LOSTJ_WALL_KICKS
  },
  Z: {
    grid: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0]
    ],
    wallKicks: LOSTJ_WALL_KICKS
  },
  O: {
    grid: [
      [1, 1],
      [1, 1]
    ]
  }
};

@Injectable()
export class TetrominoService {

  private tetrominoSubject: BehaviorSubject<Tetromino>;
  private tetromino$: Observable<Tetromino>;

  constructor(private tbs: TetrominoBagService) {
    this.tetrominoSubject = new BehaviorSubject<Tetromino>(null);
    this.tetromino$ = this.tetrominoSubject.asObservable();
  }

  next() {
    return this.tetrominoSubject.next(this.getTetrominoByType(this.tbs.nextTetromino()));
  }

  get tetromino() {
    return this.tetrominoSubject.getValue();
  }

  getTetromino$() {
    return this.tetromino$;
  }

  getTetrominoByType(type: Cell) {
    return new Tetromino(type, TETROMINO_DATA[type].grid, TETROMINO_DATA[type].wallKicks);
  }

}
