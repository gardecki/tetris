import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Cell } from '../../interfaces/cell';
import { BoardService } from '../../services/board.service';
import { Grid } from '../../interfaces/grid';
import { Tetromino } from '../../classes/tetromino';

@Component({
  selector: 'app-board-container',
  templateUrl: './board-container.component.html',
  styleUrls: ['./board-container.component.scss']
})
export class BoardContainerComponent {

  board$: Observable<Grid>;
  tetromino: Tetromino = new Tetromino();

  constructor(private bs: BoardService) {
    this.board$ = bs.getCells$();
  }
}
