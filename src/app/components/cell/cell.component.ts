import {
  ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges, OnInit,
  SimpleChanges
} from '@angular/core';
import { Cell } from '../../interfaces/cell';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CellComponent implements OnChanges {

  @HostBinding('style.width.px')
  @HostBinding('style.height.px')
  @Input() size = 32;

  @HostBinding('class')
  @Input() type: Cell;

  @Input() x: number;
  @Input() y: number;

  @HostBinding('style.top.px')
  get top() {
    return this.size * this.y;
  }

  @HostBinding('style.left.px')
  get left() {
    return this.size * this.x;
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.x, this.y, changes);
  }

}
