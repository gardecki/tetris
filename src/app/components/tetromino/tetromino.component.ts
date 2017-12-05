import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { IGrid } from '../../interfaces/grid';

@Component({
  selector: 'app-tetromino',
  templateUrl: './tetromino.component.html',
  styleUrls: ['./tetromino.component.scss']
})
export class TetrominoComponent implements OnInit {

  private cellSize = 32;

  @HostBinding('style.top.px')
  get top() {
    return this.cellSize * this.y;
  }

  @HostBinding('style.left.px')
  get left() {
    return this.cellSize * this.x;
  }

  @Input() cells: IGrid;
  @Input() x = 0;
  @Input() y = 0;

  constructor() {
  }

  ngOnInit() {
  }

}
