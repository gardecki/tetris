import { Cell } from './cell';

/**
 * Two dimensional array of rows representing IIGrid
 */
export interface IGrid extends Array<IRow> {
  [index: number]: IRow;
}

/**
 * Array of Cell enums representing single row
 */
export interface IRow extends Array<Cell> {
  [index: number]: Cell;
}
