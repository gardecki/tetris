import { Cell } from '../interfaces/cell';
import { Grid } from '../interfaces/grid';

export class Tetromino {
  private rotations: Grid[];
  private rotation: number;
  x: number;
  y: number;

  get cells() {
    return this.rotations[this.rotation];
  }

  constructor() {
    this.rotations = [
      [
        [null, Cell.O],
        [Cell.O, null]
      ],
      [
        [Cell.O, null],
        [null, Cell.O]
      ]
    ];
    this.rotation = 0;
    this.x = 0;
    this.y = 0;
  }

  rotateRight() {
    this.rotation = (this.rotation + 1) % this.rotations.length;
  }

}
