import { Cell } from '../interfaces/cell';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

const TETROMINOS: Cell[] = [Cell.S, Cell.L, Cell.I, Cell.J, Cell.O, Cell.T, Cell.Z];

@Injectable()
export class TetrominoBagService {

  private queueSize = 3;
  private bagSubject: BehaviorSubject<Cell[]>;
  private bag$: Observable<Cell[]>;

  constructor() {
    this.bagSubject = new BehaviorSubject<Cell[]>(this.getRandomBag());
    this.bag$ = this.bagSubject.asObservable();
  }

  get bag() {
    return this.bagSubject.getValue();
  }

  nextTetromino() {
    const nextTetromino = this.bag[0];
    const newBag = this.bag.slice(1, this.bag.length - 1);
    if (newBag.length <= this.queueSize) {
      Array.prototype.push.apply(newBag, this.getRandomBag());
    }
    this.bagSubject.next(newBag);
    console.log('NEXT', nextTetromino);
    return nextTetromino;
  }

  private getRandomBag(): Cell[] {
    const result = [];
    for (let i = 0; i < TETROMINOS.length; i++) {
      const index = Math.floor(Math.random() * TETROMINOS.length);
      result.push(TETROMINOS[index]);
    }
    return result;
  }
}
