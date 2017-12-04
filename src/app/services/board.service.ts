import { Injectable } from '@angular/core';
import { Cell } from '../interfaces/cell';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Grid } from '../interfaces/grid';

@Injectable()
export class BoardService {

  private cellsSubject: BehaviorSubject<Grid>;
  private cells$: Observable<Grid>;
  private width = 10;
  private height = 20;

  constructor() {
    this.cellsSubject = new BehaviorSubject<Grid>(this.getEmptyCells());
    this.cells$ = this.cellsSubject.asObservable();
  }

  get cells() {
    return this.cellsSubject.getValue();
  }

  getCells$(): Observable<Grid> {
    return this.cells$;
  }

  clearLines($event) {
    const newBoard = this.cells.filter((row, i) => !$event[i]);
    while (newBoard.length < this.height) {
      newBoard.unshift(this.getEmptyRow());
    }
    this.cellsSubject.next(newBoard);
  }

  addCell() {
    const lines = [16, 18, 19];
    const cells = this.cells
      .map((row, i) => row
        .map(cell => {
          if (!cell && lines.includes(i)) {
            return Cell.O;
          }
          return cell;
        })
      );
    this.cellsSubject.next(cells);
  }

  getEmptyRow() {
    const result = [];
    for (let i = 0; i < this.width; i++) {
      result.push(null);
    }
    return result;
  }

  getEmptyCells(): Grid {
    return [
      this.getEmptyRow(),
      this.getEmptyRow(),
      this.getEmptyRow(),
      this.getEmptyRow(),
      this.getEmptyRow(),
      this.getEmptyRow(),
      this.getEmptyRow(),
      this.getEmptyRow(),
      this.getEmptyRow(),
      this.getEmptyRow(),
      this.getEmptyRow(),
      this.getEmptyRow(),
      this.getEmptyRow(),
      this.getEmptyRow(),
      this.getEmptyRow(),
      [null, null, null, null, null, null, Cell.O, null, Cell.L, Cell.Z],
      [Cell.Z, Cell.L, null, null, null, Cell.S, Cell.O, null, Cell.L, Cell.Z],
      [Cell.Z, Cell.L, Cell.O, Cell.L, Cell.O, Cell.S, Cell.O, null, Cell.L, Cell.Z],
      [Cell.Z, Cell.L, Cell.O, Cell.O, Cell.J, Cell.O, Cell.S, null, Cell.I, Cell.L],
      [Cell.Z, Cell.L, Cell.O, Cell.L, Cell.O, null, Cell.Z, Cell.O, Cell.J, Cell.J],
    ];

    // const cells = [];
    // for (let i = 0; i < this.height; i++) {
    //   cells.push(this.getEmptyRow());
    // }
    // return cells;
  }

}
