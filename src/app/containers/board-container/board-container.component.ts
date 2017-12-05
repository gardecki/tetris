import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BoardService } from '../../services/board.service';
import { IGrid } from '../../interfaces/grid';
import { Tetromino } from '../../classes/tetromino';
import { TetrominoService } from '../../services/tetromino.service';

@Component({
  selector: 'app-board-container',
  templateUrl: './board-container.component.html',
  styleUrls: ['./board-container.component.scss']
})
export class BoardContainerComponent {

  board$: Observable<IGrid>;
  tetromino$: Observable<Tetromino>;

  constructor(private bs: BoardService, private ts: TetrominoService) {
    this.board$ = bs.getCells$();
    this.tetromino$ = ts.getTetromino$()
  }
}
