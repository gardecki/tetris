import { Cell } from './cell';

/**
 * Two dimensional array of rows representing grid
 */
export interface Grid extends Array<Row> {
  [index: number]: Row;
}

/**
 * Array of Cell enums representing single row
 */
export interface Row extends Array<Cell> {
  [index: number]: Cell;
}
