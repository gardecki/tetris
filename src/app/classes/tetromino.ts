import { Cell } from '../interfaces/cell';
import { IGrid } from '../interfaces/grid';
import { IPoint } from '../interfaces/point';

export class Tetromino {
  private rotations: IGrid[];
  private rotation: number;
  type: Cell;
  wallKicks: IPoint[][][];
  x: number;
  y: number;

  get cells() {
    return this.rotations[this.rotation];
  }

  constructor(type: Cell, grid: (0 | 1)[][], wallKicks: IPoint[][][] = null) {
    const spawnPosition = this.getSpawnPosition(grid);
    this.rotations = this.getRotations(type, grid);
    this.rotation = 0;
    this.type = type;
    this.x = spawnPosition.x;
    this.y = spawnPosition.y;
    this.wallKicks = wallKicks;
  }

  rotateRight() {
    this.rotation = (this.rotation + 1) % this.rotations.length;
  }

  private getRotations(type: Cell, grid: (0 | 1)[][]): IGrid[] {
    const rotations = [this.getGrid(type, grid)];
    while (this.addRotation(rotations)) {}
    return rotations;
  }

  private getSpawnPosition(grid): IPoint {
    const firstRow = grid.findIndex(row => row.find(cell => cell));
    console.log(firstRow);
    return {
      x: 5 - Math.ceil(grid.length / 2),
      y: -firstRow
    };
  }

  private getGrid(type: Cell, grid: (0 | 1)[][]): IGrid {
    return grid.map(row =>
      row.map(cell => cell ? type : null)
    );
  }

  private addRotation(rotations: IGrid[]): boolean {
    const rotation = this.getNextRotation(rotations[rotations.length - 1]);
    if (!this.isShapeEqual(rotations[0], rotation)) {
      rotations.push(rotation);
      return true;
    }
    return false;
  }

  private isShapeEqual(a: IGrid, b: IGrid) {
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < a.length; j++) {
        if (a[j][i] !== b[j][i]) {
          return false;
        }
      }
    }
    return true;
  }

  private getNextRotation(prevRotation: IGrid): IGrid {
    const result = [];
    const size = prevRotation.length;
    for (let y = 0; y < size; y++) {
      const row = [];
      for (let x = 0; x < size; x++) {
        const [sX, sY] = [y, size - 1 - x];
        row.push(prevRotation[sY][sX]);
      }
      result.push(row);
    }
    return result;
  }

}
